const express = require("express");
const router = express.Router();
const hashService = require("../../utils/hash/hashService");
const {
  registerUserValidation,
  loginUserValidation,
  idValidation,
  updateUserValidation,
} = require("../../validation/authValidationService");
const normalizeUser = require("../../model/usersService/helpers/normalizationUserService");
const usersServiceModel = require("../../model/usersService/usersService");
const { generateToken } = require("../../utils/token/tokenService");
const CustomError = require("../../utils/CustomError");
const permissionsMiddleware = require("../../middleware/permissionsMiddleware");

const userPermissionsMiddleware = require("../../middleware/adminRegisterOrPromissions");

const authmw = require("../../middleware/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    await registerUserValidation(req.body);
    req.body.password = await hashService.generateHash(req.body.password);
    req.body = normalizeUser(req.body);
    await usersServiceModel.registerUser(req.body);
    res.json({ msg: "register" });
  } catch (err) {
    res.status(400).json(err);
  }
});

//  end points(2) all --DONE--
router.post("/login", async (req, res) => {
  try {
    await loginUserValidation(req.body);
    const userData = await usersServiceModel.getUserByEmail(req.body.email);
    if (!userData) throw new CustomError("invalid email and/or password");
    const isPasswordMatch = await hashService.cmpHash(
      req.body.password,
      userData.password
    );
    if (!isPasswordMatch)
      throw new CustomError("invalid email and/or password");
    const token = await generateToken({
      _id: userData._id,
      isAdmin: userData.isAdmin,
      isBusiness: userData.isBusiness,
    });
    res.json({ token });
  } catch (err) {
    res.status(400).json(err);
  }
});

//  end points(3)  --DONE--

router.get(
  "/users",
  authmw,
  permissionsMiddleware(false, true, false),
  async (req, res) => {
    try {
      const allUsers = await usersServiceModel.getAllUsers();
      res.json(allUsers);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

// end points(4) --DONE--
router.get(
  "/:id",
  authmw,
  userPermissionsMiddleware(true, true),
  async (req, res) => {
    try {
      await idValidation(req.params.id);
      const userFromDB = await usersServiceModel.getUserById(req.params.id);
      res.json(userFromDB);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
//  end points(5)  --DONE--

router.put(
  "/:id",
  authmw,
  userPermissionsMiddleware(true, true),
  async (req, res) => {
    try {
      await idValidation(req.params.id);
      await updateUserValidation(req.body);
      req.body = normalizeUser(req.body);
      req.body.password = await hashService.generateHash(req.body.password);
      const userFromDB = await usersServiceModel.updateUser(
        req.params.id,
        req.body
      );
      res.json(userFromDB);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);

//  end points(6)  --DONE--
router.patch(
  "/:id",
  authmw,
  userPermissionsMiddleware(true, true),
  async (req, res) => {
    try {
      await idValidation(req.params.id);

      const userFromDB = await usersServiceModel.getUserById(req.params.id);
      userFromDB.isBusiness = !userFromDB.isBusiness;
      const userFromDBUpdate = await usersServiceModel.updateUser(
        req.params.id,
        userFromDB
      );
      res.json(userFromDBUpdate);
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
//  end points(7)  --DONE--

router.delete(
  "/:id",
  authmw,
  userPermissionsMiddleware(true, true),
  async (req, res) => {
    try {
      await idValidation(req.params.id);
      const userFromDB = await usersServiceModel.deleteUser(req.params.id);
      if (userFromDB) {
        res.json({ msg: "user deleted" });
      } else {
        res.json({ msg: "could not find the user" });
      }
    } catch (err) {
      res.status(400).json(err);
    }
  }
);
module.exports = router;
