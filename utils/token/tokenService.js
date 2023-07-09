const config = require("config");
const jwt = require("./jwt");

const tokenOption = config.get("tokenOption");

const generateToken = (payload, expDate = "30d") => {
  if (tokenOption === "jwt") {
    return jwt.generateToken(payload, expDate);
  }
};

const verifyToken = (token) => {
  if (tokenOption === "jwt") {
    return jwt.verifyToken(token);
  }
};

module.exports = { generateToken, verifyToken };
