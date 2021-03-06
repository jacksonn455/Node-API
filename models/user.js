const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  created: {
       type: Date,
        default: Date.now
     }
});

User.pre('save', async function(next) {
  let user = this;
  if (!user.isModified('password')) return next();

  user.password = await bcrypt.hash(user.password, 10);
  return next();
  })


module.exports = mongoose.model("User", User);
