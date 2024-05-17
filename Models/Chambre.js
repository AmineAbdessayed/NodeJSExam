const mongo = require("mongoose");
const Schema = mongo.Schema;
const Chambre = new Schema({
  numero: Number,
  hotel: String,
  reservee: String,
  nom_client: String,
});

module.exports = mongo.model("chambre", Chambre);
