const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const User = require('../models/user')
const Admin = require('../models/admin')
const mongoose = require('mongoose')
const db = "mongodb+srv://uservishwas:passwordvishwas@Users-9rs2o.mongodb.net/eventsdb?retryWrites=true&w=majority"

mongoose.set('useUnifiedTopology', true);
mongoose.connect(db, { useNewUrlParser: true }, err =>{
    if(err) {
        console.error('Error!' + err)
    }else{
        console.log('Connected to mongodb')
    }
})

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]
    if(token === 'null'){
        return res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')
    if(!payload){
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

router.get('/', (req, res) => {
    res.send('From API route')
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if(error){
            console.log(error)
        }else{
            let payload = { subject: registeredUser.id }
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('Email invalido!')
            }else if(user.password !== userData.password){
                res.status(401).send('Senha invalida!')
            }else{
                let payload = { subject: user.id }
                let token = jwt.sign(payload, 'secretKey')
                res.status(200).send({token})
            }
        }
    })
})

router.post('/registerAdmin', (req, res) => {
    let adminData = req.body
    let admin = new Admin(adminData)
    admin.save((error, registeredAdmin) => {
        if(error){
            console.log(error)
        }else{
            let payload = { subject: registeredAdmin.id }
            let tokenAdmin = jwt.sign(payload, 'secretKey')
            res.status(200).send({tokenAdmin})
        }
    })
})

router.post('/loginAdmin', (req, res) => {
    let adminData = req.body

    Admin.findOne({email: adminData.email}, (error, admin) => {
        if(error){
            console.log(error)
        }else{
            if(!admin){
                res.status(401).send('Email invalido!')
            }else if(admin.password !== adminData.password){
                res.status(401).send('Senha invalida!')
            }else{
                let payload = { subject: admin.id }
                let tokenAdmin = jwt.sign(payload, 'secretKey')
                res.status(200).send({tokenAdmin})
            }
        }
    })

})

module.exports = router