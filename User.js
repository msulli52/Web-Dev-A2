// User.js 

const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: {type:String, require:true, min:3, max:256},
    email: {type:String, require:true, min:6, max:256},
    password: {type:String, require:true, min:6, max:1024},
})

module.exports = mongoose.model('users', UserSchema)
