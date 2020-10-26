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
    team1Driver1: {
        type: String
    },
    team1Driver2: {
    type: String
    },
    team1Chassi: {
        type: String
    },
    team1Engine: {
        type: String
    },
    team1Name: {
        type: String
    },
    team2Driver1: {
        type: String
    },
    team2Driver2: {
    type: String
    },
    team2Chassi: {
        type: String
    },
    team2Engine: {
        type: String
    },
    team2Name: {
        type: String
    }
}, {
   collection: 'teams'
})

module.exports = mongoose.model('Team', Team)
