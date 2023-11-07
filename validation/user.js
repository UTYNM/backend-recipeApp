const Joi = require('joi');

const regisUser = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

const loginUser = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

module.exports = { regisUser, loginUser };