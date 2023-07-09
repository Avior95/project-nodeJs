const express = require("express");
const router = express.Router();
const cardsServiceModel = require("../../model/cardsService/cardsService");
const normalizeCard = require("../../model/cardsService/helpers/normalizationCardService");
const cardsValidationService = require("../../validation/cardsValidationService");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");
const authmw = require("../../middleware/authMiddleware");

// end points(1)  --DONE--
router.get("/", async (req, res) => {
  try {
    const allCards = await cardsServiceModel.getAllCards();
    res.json(allCards);
  } catch (err) {
    res.status(400).json(err);
  }
});

//  end points(2)   --DONE--
router.get("/my-cards", authmw, async (req, res) => {
  try {
    const userId = req.userData._id;
    const myCardsFromDB = await cardsServiceModel.getCardByUserId(userId);
    res.json(myCardsFromDB);
  } catch (err) {
    res.status(400).json(err);
  }
});

// end points(3) all --DONE--
router.get("cards/:id", async (req, res) => {
  try {
    await cardsValidationService.idValidation(req.params.id);
    const cardFromDB = await cardsServiceModel.getCardById(req.params.id);
    res.json(cardFromDB);
  } catch (err) {
    res.status(400).json(err);
  }
});

// end points(4)   --DONE--
router.post(
  "/",
  authmw,
  permissionsMiddleware(true, false, false),
  async (req, res) => {
    try {
      await cardsValidationService.createCardValidation(req.body);
      let normalCard = await normalizeCard(req.body, req.userData._id);
      const dataFromMongoose = await cardsServiceModel.createCard(normalCard);
      console.log("dataFromMongoose", dataFromMongoose);
      res.json({ msg: "ok" });
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// end points(5) --DONE--
router.put(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, false),
  async (req, res) => {
    try {
      await cardsValidationService.idValidation(req.params.id);
      await cardsValidationService.createCardValidation(req.body);
      await normalizeCard(req.body, req.userData._id);
      const cardFromDB = await cardsServiceModel.updateCard(
        req.params.id,
        req.body
      );
      res.json(cardFromDB);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

//  end points(6)   -- DONE--
router.patch("/:id", authmw, async (req, res) => {
  try {
    await cardsValidationService.idValidation(req.params.id);
    const cardFromDB = await cardsServiceModel.getCardById(req.params.id);
    if (cardFromDB.likes.includes(req.userData._id)) {
      return res.json({ msg: "The card is already liked" });
    } else {
      cardFromDB.likes.push(req.userData._id);
    }
    await cardsServiceModel.updateCard(req.params.id, cardFromDB);
    res.json(cardFromDB);
  } catch (err) {
    res.status(400).json(err);
  }
});

//  end points(7) --DONE--
router.delete(
  "/:id",
  authmw,
  permissionsMiddleware(false, true, true),
  async (req, res) => {
    try {
      await cardsValidationService.idValidation(req.params.id);
      const cardFromDB = await cardsServiceModel.deleteCard(req.params.id);
      if (cardFromDB) {
        res.json({ msg: "card deleted" });
      } else {
        res.json({ msg: "could not find the card" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
router.patch(
  "/:id/:bizNumber",
  authmw,
  permissionsMiddleware(false, true, false), // Assuming this middleware is for admin permission check
  async (req, res) => {
    try {
      // await idValidation.idValidation(req.params.id);

      const card = await cardsServiceModel.getCardById(req.params.id);
      if (!card) {
        return res.status(404).json({ msg: "Card not found" });
      }
      // Generate a new bizNumber
      const newBizNumber = generateBizNum();
      const allCards = await cardsServiceModel.getAllCards();

      for (let card of allCards) {
      }

      // Check if the bizNumber is not already taken.

      // const isBizNumberTaken = await cardsServiceModel.isBizNumberTaken(
      //   req.body.bizNumber
      // );
      // if (isBizNumberTaken) {
      //   return res.status(400).json({ msg: "BizNumber is already taken" });
      // }

      // Update the card with the new bizNumber.
      // await cardsServiceModel.updateCard(req.params.id, {
      //   bizNumber: newBizNumber,
      // });

      // const updatedCard = await cardsServiceModel.getCardById(req.params.id);

      // res.json({
      //   msg: "BizNumber updated",
      //   bizNumber: updatedCard.bizNumber,
      // });
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  }
);
module.exports = router;
