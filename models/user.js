const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now }
})

const user = mongoose.model('user', userSchema)

module.exports = user