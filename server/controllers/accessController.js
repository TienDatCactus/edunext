const query = require("../db/queries");
const jwt = require("jsonwebtoken");

let refreshTokens = [];

const loginControl = async (req, res) => {
  const { email, password } = req.body;
  const { id } = req.body;
  const { campus } = req.body;
  let user = null;
  try {
    if (id !== undefined) {
      user = await query.loginWithId(campus, id);
      if (user?.isOk === false)
        return res.json({ error: user?.error, isOk: user?.isOk });
    } else {
      user = await query.loginWithEmail(campus, email, password);
      if (user?.isOk === false)
        return res.json({ error: user?.error, isOk: user?.isOk });
    }
    if (user.isOk === true) {
      const accessToken = generateAccessToken(user);
      const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
      refreshTokens.push(refreshToken);
      res.json({
        message: "Đăng nhập thành công !",
        isOk: true,
        user: {
          accessToken: accessToken,
          refreshToken: refreshToken,
          user: {
            userId: user?.user?.userId,
            name: user?.user?.name,
            email: user?.user?.email,
            FEID: user?.user?.FEID,
            campusId: user?.user?.campusId,
            classId: user?.user?.classId,
            roleId: user?.user?.roleId,
          },
        },
      });
    }
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY" || error.message.includes("duplicate")) {
      return res.json({ error: "Email already exists", isOk: false });
    }
    console.error("Registration error:", error);
    return res.json({ error: "Internal server error", isOk: false });
  }
};

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
}

const logoutControl = (req, res) => {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.clearCookie("jwt");
  res.status(204).json({ message: "Logout successful" });
};
const getCampuses = async (req, res) => {
  try {
    const campuses = await query.getCampuses();
    console.log(campuses)
    if (campuses?.isOk === false) {
      return res
        .status(400)
        .json({ error: campuses?.error, isOk: campuses?.isOk });
    }
    
    res.json({ campuses: campuses?.campuses, isOk: true });
  } catch (error) {
    console.error("Campuses fetch error:", error);
    res.status(500).json({ error: "Internal server error", isOk: false });
  }
};
const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await query.getUserById(id);
    if (user?.isOk === false) {
      return res.status(400).json({ error: user?.error, isOk: user?.isOk });
    }
    res.json({ user: user?.user, isOk: true });
  } catch (error) {
    console.error("User fetch error:", error);
    res.status(500).json({ error: "Internal server error", isOk: false });
  }
};
module.exports = { loginControl, logoutControl, getUserById, getCampuses };
