const config = require("config");
const joiRegisterValidation = require("./joi/registerValidation");
const joiLoginValidation = require("./joi/loginValidation");
const joiUpdateValidation = require("./joi/updateUserValidation");
const joiIdValidation = require("./joi/idValidation");

const validatorOption = config.get("validatorOption");

const registerUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiRegisterValidation.validateRegisterSchema(userInput);
  }
  throw new Error("validator undefined");
};
const updateUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiUpdateValidation.validateUpdateSchema(userInput);
  }
  throw new Error("validator undefined");
};
const loginUserValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiLoginValidation.validateLoginSchema(userInput);
  }
  throw new Error("validator undefined");
};

const idValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiIdValidation.validateIdSchema(userInput);
  }
  throw new Error("validator undefined");
};
module.exports = {
  registerUserValidation,
  loginUserValidation,
  idValidation,
  updateUserValidation,
};
