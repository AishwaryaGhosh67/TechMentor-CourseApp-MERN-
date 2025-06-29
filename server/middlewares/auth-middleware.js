const jwt = require("jsonwebtoken");
const User = require("../models/user-model");

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: "Unauthorized HTTP, Token not provided" });
    }

    // Assume token is in formet "Bearer <jwtToken>, Removing the "Bearer" prefix
    const jwtToken = token.replace("Bearer", "").trim();
    console.log("token from auth middleware", jwtToken);

    try {
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SCRECT_KEY);

        const userData = await User.findOne({ email: isVerified.email }).select({
            password: 0,
        });
        console.log(userData);

        req.user = userData;
        req.token = token;
        req.userId = userData._id;

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }
};

module.exports = authMiddleware;