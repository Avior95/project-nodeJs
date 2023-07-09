const Joi = require("joi");
const idSchema = Joi.string().hex().length(24);

const validateIdSchema = (userInput) => {
  return idSchema.validateAsync(userInput);
};

module.exports = {
  validateIdSchema,
};
