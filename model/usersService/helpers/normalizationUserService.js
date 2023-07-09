const config = require("config");
const normalizationUserMongo = require("../../mongodb/users/helpers/normalizationUser");
const dbOption = config.get("dbOption");

const normalizationUserService = (userData) => {
  if (dbOption === "mongo") {
    return normalizationUserMongo(userData);
  }
};

module.exports = normalizationUserService;
