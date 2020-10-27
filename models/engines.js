const { Int32 } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Engine = new Schema({
   name: {
      type: String
   },
   value: {
      type: Number
   },
}, {
   collection: 'engines'
})

module.exports = mongoose.model('Engine', Engine)