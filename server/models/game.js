const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
    user: {type:mongoose.Schema.Types.ObjectId, ref:'user'},
    gameName: { type: String },
    address: { type: String },
    city: { type: String },
    country: { type: String },
    contactName: { type: String },
    position: { type: String },
    phoneNumber: { type: String },
    email: { type: String },
    createdAt: { type: Date, default: Date.now }
})
 
const game = mongoose.model('game', gameSchema)

module.exports = game