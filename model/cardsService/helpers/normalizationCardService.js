const config = require("config");
const normalizationCardMongo = require("../../mongodb/cards/helpers/normalizationCard");
const dbOption = config.get("dbOption");

const normalizeCardService = (card, userId) => {
  if (dbOption === "mongo") {
    return normalizationCardMongo(card, userId);
  }
};

module.exports = normalizeCardService;
