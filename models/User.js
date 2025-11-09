const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  credits: { type: Number, default: 5 },
  plan: { type: String, default: 'free' }
});
module.exports = mongoose.model('User', UserSchema);
