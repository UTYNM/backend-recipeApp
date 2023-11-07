const express = require("express");
const commentControllers = require("../controllers/commentController");
const { authUser } = require("../middlewares/authentication");
const { checkUserOwnership } = require("../middlewares/authorization");
const router = express.Router();

router.post('/', authUser, commentControllers.createComment);
router.get("/", commentControllers.getComment);
router.get("/:id", commentControllers.getCommentById);
router.put('/:id', authUser, checkUserOwnership, commentControllers.updateComment);
router.delete('/:id', authUser, checkUserOwnership,commentControllers.deleteComment);

module.exports = router;