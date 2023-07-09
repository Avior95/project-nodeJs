const express = require("express");
const router = express.Router();

const authRouter = require("./api/auth");
const cardsRouter = require("./api/cards");

// http://localhost:8181/api
// http://localhost:8181/api/
router.get("/", (req, res) => {
  res.json({ msg: "sub route" });
});

//http://localhost:8181/api/register
router.get("/register", (req, res) => {
  res.json({ msg: "register" });
});

//http://localhost:8181/api/auth/
router.use("/auth", authRouter);

//http://localhost:8181/api/cards
router.use("/cards", cardsRouter);

// const generate_biz = () => {
//   // throw new Error("yey error ;)");
//   return Promise.reject("yey error ;)");
// };

// const normal_ = async () => {
//   await generate_biz();
// };

// router.get("/createerror", async (req, res) => {
//   try {
//     await normal_();
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
