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
   value: {
      type: Number
   },
   first: {
      type: Number
   },
   second: {
      type: Number
   },
   sixth: {
      type: Number
   },
   eleventh: {
      type: Number
   },
   sixteenth: {
      type: Number
   },
   ninteenth: {
      type: Number
   },
   dnf: {
      type: Number
   },
}, {
   collection: 'drivers'
})

module.exports = mongoose.model('Driver', Driver)