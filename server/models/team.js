const mongoose = require('mongoose')
const Schema = mongoose.Schema
const teamSchema = new mongoose.Schema({
    teamOne: {
        goalKeeper: {type:String},
        defenderOne: {type:String},
        defenderTwo: {type:String},
        defenderThree: {type:String,},
        defenderFour: {type:String,},
        midfielderOne:{type:String,},
        midfielderTwo:{type:String,},
        midfielderThree:{type:String,},
        midfielderFour:{type:String,},
        attackerOne: {type:String,},
        attackerTwo: {type:String,},
    },
    teamTwo: {
        goalKeeper: {type:String, },
        defenderOne: {type:String,},
        defenderTwo: {type:String,},
        defenderThree: {type:String,},
        defenderFour: {type:String,},
        midfielderOne:{type:String,},
        midfielderTwo:{type:String,},
        midfielderThree:{type:String,},
        midfielderFour:{type:String,},
        attackerOne: {type:String,},
        attackerTwo: {type:String},
    },
    user: {type:Schema.Types.ObjectId, ref:'user'},
    game: {type:Schema.Types.ObjectId, ref:'game'},
    createdAt:{type:Date, default:Date.now},

})

const team = mongoose.model('team', teamSchema)
module.exports = team