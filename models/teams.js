const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Team = new Schema({
    owner: {
        type: String
    },
    email: {
        type: String
    },
    driver1: {
        type: String
    },
    driver2: {
    type: String
    },
    chassi: {
        type: String
    },
    engine: {
        type: String
    },
    teamName: {
        type: String
    }
}, {
   collection: 'teams'
})

module.exports = mongoose.model('Team', Team)
