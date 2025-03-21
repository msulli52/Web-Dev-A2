// Post.js 

const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    title: {type:String, require:true, maxlength:100},
    description: {type:String, require:true, maxlength:500},
    likes: {type:Number, default:0},
    createdBy: {type:mongoose.Schema.Types.ObjectId, ref:'User', require:true}
})

// export schema, map posts to the schema 
module.exports = mongoose.model('posts', PostSchema)
