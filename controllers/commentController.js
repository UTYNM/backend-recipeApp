const { Recipe, Comment } = require('../models');

class CommentController {
  static async createComment(req, res) {
    try {
      const { commentary, rating, recipeId } = req.body;
      const user = req.authUser;

      const recipe = await Recipe.findByPk(recipeId);
      if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
      }

      const comment = await Comment.create({
        commentary,
        rating,
        recipeId: recipe.id,
        userId: user ? user.id : null,
      });

      const comments = await Comment.findByPk(comment.id, {
        include: [{ model: Recipe, as: "recipes" }],
      });

      return res.status(201).json(comments);
    } catch (error) {
      console.error(`Error: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getComment(req, res) {
    try {
      const comments = await Comment.findAll({
        include: [
          {
            model: Recipe,
            as: "recipes",
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
      res.status(200).json({ comments });
    } catch (error) {
      console.error(`Error: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async getCommentById(req, res) {
    try {
      const { id } = req.params;
      const comment = await Comment.findByPk(id, {
        include: [
          {
            model: Recipe,
            as: "recipes",
            attributes: { exclude: ['createdAt', 'updatedAt'] }
          }
        ],
        attributes: { exclude: ['createdAt', 'updatedAt'] }
      });
      if (!comment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
      res.status(200).json({ comment });
    } catch (error) {
      console.error(`Error: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async updateComment(req, res) {
    try {
      const { commentary, rating } = req.body;
      const commentId = req.params.id;

      const comments = await Comment.findByPk(commentId);
      if (!comments) {
        return res.status(404).json({ error: 'Comments not available' });
      }

      comments.commentary = commentary || comments.commentary;
      comments.rating = rating || comments.rating;

      await comments.save();

      return res.status(200).json({
        commentary: comments.commentary,
        rating: comments.rating,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
      });
    } catch (error) {
      console.error(`Error: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  static async deleteComment(req, res) {
    try {
      const { id } = req.params;
      const comments = await Comment.findByPk(id);

      if (!comments) {
        return res.status(404).json({ error: 'Comments not available' });
      }

      await comments.destroy();
      return res.status(200).json({ message: `Comments with ID ${id} have been deleted` });
    } catch (error) {
      console.error(`Error: ${error}`);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = CommentController;
