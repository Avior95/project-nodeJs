const config = require("config");
const connectToDBMongo = require("./mongodb/connectToDB");
const dbOption = config.get("dbOption");

const connectToDB = () => {
  if (dbOption === "mongo") {
    return connectToDBMongo();
  }
};

module.exports = connectToDB;
