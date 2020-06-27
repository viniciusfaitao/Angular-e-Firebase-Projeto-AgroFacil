const mongoose = require('mongoose')
const router = require('../routes/api')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: String,
    email: String,
    password: String
})

module.exports = mongoose.model('user', userSchema, 'users')