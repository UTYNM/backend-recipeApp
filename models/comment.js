'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      Comment.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user", 
      });
      Comment.belongsTo(models.Recipe, {
        foreignKey: "recipeId",
        as: "recipes",
      });

    }
  }
  Comment.init({
    commentary: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 10,
      },
    },
    recipeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Recipes",
        key: "id",
    }
    },
    userId: DataTypes.INTEGER,
  }, 
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};