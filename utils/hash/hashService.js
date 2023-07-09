const config = require("config");
const bcryptjs = require("./bcrypt");
const bcryptOther = require("./bcryptOther");

const hashOption = config.get("hashOption");

const generateHash = (password) => {
  switch (hashOption) {
    case "bcryptOther":
      return bcryptOther.generateHash(password);
    case "bcryptjs":
    default:
      return bcryptjs.generateHash(password);
  }
};

const cmpHash = (password, hash) => {
  switch (hashOption) {
    case "bcryptjs":
      return bcryptjs.cmpHash(password, hash);
    case "bcryptOther":
      return bcryptOther.cmpHash(password, hash);
  }
};

module.exports = {
  generateHash,
  cmpHash,
};
