let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let UserSchema = Schema({
  login: String,
  password: String,
  email: String,
  role: String,
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("User", UserSchema);
