// Required dependencies
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv = require("dotenv");
const { User } = require("../db/model");
const mongoose = require("mongoose");
dotenv.config();

const config = {
  jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: "1d",
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/auth/google/callback",
  },
};

// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwt.secret,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
    try {
      const user = await User.findOne({ _id: jwt_payload.id }).populate(
        "campus"
      );
      if (user) {
        return done(null, user);
      }
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Validate required profile data
        if (!profile || !profile.emails || !profile.emails[0]) {
          return done(null, false, {
            message: "Invalid Google profile data",
            errorCode: "INVALID_PROFILE",
          });
        }

        const email = profile.emails[0].value;

        // Check if email is from FPT domain
        if (!email.endsWith("@fpt.edu.vn")) {
          return done(null, false, {
            message: "Chỉ cho phép địa chỉ email FPT",
            errorCode: "INVALID_EMAIL_DOMAIN",
          });
        }

        // Try to find existing user
        let user = await User.findOne({ email: email });

        if (user) {
          // Update user's Google ID if not set
          if (!user.FEID) {
            try {
              // Extract student/staff ID from email (e.g., "he180012" from "datnthe180012@fpt.edu.vn")
              const emailPrefix = email.split("@")[0]; // datnthe180012
              const matches = emailPrefix.match(/[a-z]{2}\d{6}/i); // matches "he180012"
              user.FEID = matches ? matches[0].toLowerCase() : emailPrefix;
              await user.save();
            } catch (saveError) {
              return done(null, false, {
                message: "Failed to update user profile",
                errorCode: "UPDATE_FAILED",
              });
            }
          }

          // Return user with required fields
          return done(null, {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            FEID: user.FEID,
            role: Number(user.role),
            timetable: user.timetable || [],
          });
        }

        // If user doesn't exist, create new user
        try {
          // Extract student/staff ID from email (e.g., "he180012" from "datnthe180012@fpt.edu.vn")
          const emailPrefix = email.split("@")[0]; // datnthe180012
          const matches = emailPrefix.match(/[a-z]{2}\d{6}/i); // matches "he180012"
          const feid = matches ? matches[0].toLowerCase() : emailPrefix;

          const newUser = await new User({
            email: email,
            name: profile.displayName,
            FEID: feid,
            role: 1, // Default role for new users
            timetable: [],
            campus: new mongoose.Types.ObjectId(process.env.DEFAULT_CAMPUS_ID),
          }).save();

          // Return new user with required fields
          return done(null, {
            _id: newUser._id.toString(),
            name: newUser.name,
            email: newUser.email,
            FEID: newUser.FEID,
            role: newUser.role.toString(),
            timetable: [],
          });
        } catch (createError) {
          return done(null, false, {
            message: "Failed to create new user",
            errorCode: "CREATE_FAILED",
            details: createError.message,
          });
        }
      } catch (error) {
        return done(null, false, {
          message: "Authentication failed",
          errorCode: "AUTH_ERROR",
          details: error.message,
        });
      }
    }
  )
);

// Serialization
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

module.exports = {
  passport,
  authenticateJwt: passport.authenticate("jwt", { session: false }),
  authenticateGoogle: passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    failureRedirect: false,
  }),
  googleCallback: passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  config,
};
