// Required dependencies
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const PrismaClient = require("@prisma/client").PrismaClient;
const dotenv = require("dotenv");
const prisma = new PrismaClient({ log: ["info", "warn"] });
dotenv.config();
const config = {
  jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    expiresIn: "1d",
  },
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback",
  },
};
const initializePassport = () => {
  // JWT Strategy Configuration
  const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwt.secret,
  };

  passport.use(
    new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
      try {
        const user = await prisma.user.findUnique(
          { where: { id: jwt_payload.id } },
          { include: { campus: true } }
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

  // Google Strategy Configuration
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Check if user already exists
          let user = await prisma.user.findOne({ "google.id": profile.id });
          if (user) {
            return done(null, user);
          }
          return done(null, false, {
            message: "No user found with this Google ID",
            errorCode: "USER_NOT_FOUND",
            profile: profile, // Optionally include the profile for debugging
          });
        } catch (error) {
          return done(error, false, {
            message: "Internal server error during authentication",
            errorCode: "AUTH_ERROR",
            details: error.message,
          });
        }
      }
    )
  );

  // Serialization
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.user.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};
const authenticateJwt = passport.authenticate("jwt", { session: false });

const authenticateGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
});

const googleCallback = passport.authenticate("google", {
  failureRedirect: "/login",
  failureMessage: true,
  session: false,
});

module.exports = {
  initialize: initializePassport,
  authenticateJwt,
  authenticateGoogle,
  googleCallback,
  config,
};
