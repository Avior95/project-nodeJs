const generateBizNumber = require("./generateBizNumber");

const normalizeCard = async (card, userId) => {
  if (!card.image) {
    card.image = {};
  }
  card.image = {
    url:
      card.image.url ||
      "https://cdn.pixabay.com/photo/2020/04/07/17/01/chicks-5014152_960_720.jpg",
    alt: card.image.alt || "yellow fluffy chickens",
  };
  return {
    ...card,
    address: {
      ...card.address,
      state: card.address.state || "",
    },
    bizNumber: card.bizNumber || (await generateBizNumber()),
    user_id: card.user_id || userId,
  };
};

module.exports = normalizeCard;
