const mongoose = require("mongoose");

const POTDSchema = new mongoose.Schema({
  username: String,
  time: Number,
  userId: String,
});

// compile model from schema
module.exports = mongoose.model("podt", POTDSchema);