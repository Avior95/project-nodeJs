const config = require("config");
const mongoose = require("mongoose");

console.log("con str", config.get("dbConfig.url"));

const connectToDB = () => {
  return mongoose.connect(config.get("dbConfig.url"));
};

module.exports = connectToDB;
