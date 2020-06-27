const mongoose = require('mongoose')
const router = require('../routes/api')

const Schema = mongoose.Schema

const adminSchema = new Schema({
    name: String,
    email: String,
    password: String
})

module.exports = mongoose.model('admin', adminSchema, 'admins')