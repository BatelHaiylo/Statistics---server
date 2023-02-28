const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const SignUpValidate = (data) => {
  const userSignUp = Joi.object({
    role: Joi.string().required(),
    fullName: Joi.string().required(),
    email: Joi.string().min(11).email().required(),
    age: Joi.date().required(),
    phone: Joi.string().min(11).required(),
    password: passwordComplexity().required(),
  });
  return userSignUp.validate(data);
};

const SignInValidate = (data) => {
  const userLogin = Joi.object({
    email: Joi.string().min(11).email().required(),
    password: passwordComplexity().required(),
  });
  return userLogin.validate(data);
};

module.exports = { SignUpValidate, SignInValidate };
