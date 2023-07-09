const generateHash = (password) => {
  return password + "☺";
};

const cmpHash = (password, hash) => {
  return password + "☺" === hash;
};

module.exports = {
  generateHash,
  cmpHash,
};
