const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  username: String,
  imageNames: [String],
  playedTimes: [[Number]],
  playedTemplates: [Number],
  // currentStartTime: Number,
  // currentEndTime: Number,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
