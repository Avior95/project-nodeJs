const config = require("config");
const joiCardsValidation = require("./joi/cardsValidation");
const joiIdValidation = require("./joi/idValidation");

const validatorOption = config.get("validatorOption");

const createCardValidation = (userInput) => {
  if (validatorOption === "Joi") {
    return joiCardsValidation.validateCardSchema(userInput);
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
  createCardValidation,
  idValidation,
};
