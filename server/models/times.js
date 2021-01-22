const mongoose = require("mongoose");

const TimesSchema = new mongoose.Schema({
  username: String,
  time: Number,
  templateId: Number,
  userId: String,
});

// compile model from schema
module.exports = mongoose.model("times", TimesSchema);
