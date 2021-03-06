const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, min: 3, max: 255 },
  email: { type: String, required: true, max: 255 },
  password: { type: String, required: true, max: 1024, min: 6 },
  dateCreated: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
