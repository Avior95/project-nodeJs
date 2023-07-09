const CustomError = require("../utils/CustomError");

const userPermissionsMiddleware = (isRegister, isAdmin) => {
  return (req, res, next) => {
    if (!req.userData) {
      throw new CustomError("must provide userData");
    }
    if (
      (isAdmin === req.userData.isAdmin && isAdmin === true) ||
      (req.userData._id === req.params.id && isRegister === true)
    ) {
      return next();
    }

    res.status(401).json({ msg: "you not allowed to edit " });
  };
};

module.exports = userPermissionsMiddleware;
