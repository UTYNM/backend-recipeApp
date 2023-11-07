const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "User is not authenticated" });
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        const user = await User.findOne({ where: { id: decoded?.id } });
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.authUser = user;
        next();
    } catch (error) {
        console.error(`Error: ${error}`);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { authUser };
