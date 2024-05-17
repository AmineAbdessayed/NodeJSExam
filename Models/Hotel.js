const mongo = require("mongoose");
const Schema = mongo.Schema;
const Hotel = new Schema({
  nom: String,
  adresse: String,
  nb_chambre: Number,
  email: String,
});

module.exports = mongo.model("hotel", Hotel);
