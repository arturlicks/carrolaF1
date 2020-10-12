const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Driver = new Schema({
   firstName: {
      type: String
   },
   lastName: {
      type: String
   },
   team: {
      type: String
   },
}, {
   collection: 'drivers'
})

module.exports = mongoose.model('Driver', Driver)