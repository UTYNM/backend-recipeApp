'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recipe extends Model {
    static associate(models) {
      Recipe.hasMany(models.Comment, {
        foreignKey: "recipeId",
        as: "comments",
      });
      Recipe.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user", 
      });
    }
  }
  Recipe.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        max: 255,
        notNull: true
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true
      },
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true
      },
    },
    production: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: true
      },
    },
    userId: DataTypes.INTEGER,
  }, 
    {
      sequelize,
      modelName: "Recipe",
    }
  );
  return Recipe;
};