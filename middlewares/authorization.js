const { Comment } = require("../models");

const checkAdmin = async (req, res, next) => {
    try {
        const { isAdmin } = req.authUser;
        if (!isAdmin) {
            return res.status(403).json({ error: "Only admin can access this" });
        }

        next();
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

const checkUserOwnership = async (req, res, next) => {
    try {
        const comment = await Comment.findOne({ where: { id: req.params.id } });
        const user = req.authUser;
        if (!comment) {
            return res.status(404).json({ error: "Comments not found" });
        }

        if (comment.userId !== user.id) {
            return res.status(403).json({ error: "You do not have permission to access this data" });
        }

        next();
    } catch (error) {
        console.error(`Error: ${error}`);
    }
};

module.exports = { checkAdmin, checkUserOwnership };
