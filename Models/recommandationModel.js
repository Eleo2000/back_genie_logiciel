const mongoose = require('mongoose');
const Client = require('./clientModel');
const Livre = require('./livreModel');

const recommandationSchema = new mongoose.Schema({
  id_client: { type:mongoose.Schema.Types.ObjectId, ref:Client , required : true},
  id_livre: { type:mongoose.Schema.Types.ObjectId, ref:Livre, required : true},
  type_livre: { type: String, required: true },
  countClick: { type: Number, required: true },

});

const Recommandation = mongoose.model('Recommandation', recommandationSchema); //nomTable dans mongoDB

module.exports = Recommandation ;
