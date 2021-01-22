const mongoose = require("mongoose");

const LobbiesSchema = new mongoose.Schema({
  creatorname: String,
  name: String,
  code: String,
  playerCount: Number,
  players: [String],
});

// compile model from schema
module.exports = mongoose.model("lobbies", LobbiesSchema);