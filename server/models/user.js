const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  username: String,
  imageNames: [String],
  playedTimes: [String],
  playedTemplates: [Number],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
