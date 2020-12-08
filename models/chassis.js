const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Chassi = new Schema({
   name: {
      type: String
   },
   value: {
      type: Number
   },
}, {
   collection: 'chassis'
})

module.exports = mongoose.model('Chassi', Chassi)