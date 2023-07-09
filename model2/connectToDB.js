const config = require("config");
const mongoose = require("mongoose");

console.log("con str", config.get("dbConfig.url"));

module.exports = mongoose.connect(config.get("dbConfig.url"));
