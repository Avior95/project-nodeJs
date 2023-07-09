const bcrypt = require("bcryptjs");

const generateHash = (password) => bcrypt.hash(password, 10);

const cmpHash = (password, hash) => bcrypt.compare(password, hash);

module.exports = {
  generateHash,
  cmpHash,
};
