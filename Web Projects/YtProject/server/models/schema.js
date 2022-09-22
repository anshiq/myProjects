const mongoose = require('mongoose')
const TaskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide title of Video'],
        trim: true
        
    },
    description:{
        type: String,
        required: [true, 'must provide title of Video'],
        trim: true,
        maxlength: [120, 'dscription can not be more than 120 characters'],
    },
    likes:{
        type: Number
    },
    dislikes:{
        type: Number
    },
    tags:{
        type: Array
    },
    date:{
        type: Date
    }
  })
  const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'must provide title of Video'],
        trim: true
        
    },
    password:{
        type: String,
        required: [true, 'must provide title of Video'],
        trim: true,
        minlength: [8, 'password can not be less than 8 characters'],
    }
  })
const TaskSchemas = mongoose.model('videoDetails',TaskSchema)
const LoginSchemas = mongoose.model('loginDetails',LoginSchema)
// tasks will the collection in the database having above schema 
module.exports = {TaskSchemas,LoginSchemas}