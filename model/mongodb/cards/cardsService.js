const Card = require("./Card");

const createCard = (cardToSave) => {
  let card = new Card(cardToSave);
  return card.save();
};

const getAllCards = () => {
  return Card.find();
};

const getCardById = (id) => {
  return Card.findById(id);
};

const getCardByBizNumber = (bizNumber) => {
  return Card.find({ bizNumber }, { bizNumber: 1, _id: 0 });
};

const getCardByUserId = (user_id) => {
  return Card.find({ user_id }, { user_id: 0, _id: 1 });
};

const updateCard = (id, cardToUpdate) => {
  //normalize card
  return Card.findByIdAndUpdate(id, cardToUpdate, {
    new: true,
  });
};

const deleteCard = (id) => {
  return Card.findByIdAndDelete(id);
};

module.exports = {
  createCard,
  getAllCards,
  getCardById,
  getCardByBizNumber,
  updateCard,
  deleteCard,
  getCardByUserId,
};
