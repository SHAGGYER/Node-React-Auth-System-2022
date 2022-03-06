const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  if (!user.password) return next();

  user.password = await bcrypt.hash(user.password, 10);
  return next();
});

const User = new mongoose.model("User", UserSchema, "users");
module.exports = User;
