const { Schema, ObjectId } = require("mongoose");
const mongoose = require("mongoose");
const usersSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
});

const userModel = mongoose.model("users", usersSchema);
module.exports = {
  userModel,
};
