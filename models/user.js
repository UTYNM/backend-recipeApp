'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Comment, {
        foreignKey: "userId",
        as: "comments"
      });
      User.hasMany(models.Recipe, {
        foreignKey: "userId",
        as: "recipes"
      });
    }
  }
  User.init({
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Invalid email",
        },
      },
    },
    password:{
      type: DataTypes.TEXT,
      min: {
        args: 8,
        msg: "Password must be at least 8 characters",
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  }, 
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate(async (user, options) => {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;
  });
  return User;
};