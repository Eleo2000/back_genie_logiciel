const mongoose = require('mongoose');
const Client = require('../Models/clientModel');

const livreSchema = new mongoose.Schema({
  id_client: { type:mongoose.Schema.Types.ObjectId, ref:Client , required : true},
  titre: { type: String, required: true },
  type: { type: String, required: true },
  originalname: { type: String, required: true },
  filename: { type: String, required: true },
  filePath: { type: String, required: true },

});

const Livre = mongoose.model('Livre', livreSchema); //nomTable dans mongoDB

module.exports = Livre ;
