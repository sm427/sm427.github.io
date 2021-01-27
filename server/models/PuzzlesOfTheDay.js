const mongoose = require("mongoose");

const PotdSchema = new mongoose.Schema({
  username: String,
  time: Number,
  userId: String,
  playedDate: String,
});

// compile model from schema
module.exports = mongoose.model("podt", PotdSchema);