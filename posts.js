// posts.js 

const express = require('express')
const router = express.Router() 

const Post = require('../models/Post')
const verifyToken = require('../verifyToken')
const mongoose = require('mongoose')


// Create a post  
router.post('/', verifyToken, async(req, res) => {
    try{
        const postData = new Post({
            title:req.body.title,
            description:req.body.description, 
            createdBy:req.user._id // extract user id from jwt token
        })

        const postToSave = await postData.save()
        res.send(postToSave)
    }
    catch(err){
        res.send({message:err})
    }
})


// Get all posts 
router.get('/', async(req, res) => {
    try {
        const allPosts = await Post.find()
        res.send(allPosts)
    } catch (err) {
        res.send({message:err})
    }
})


// Get a single post by id  
router.get('/:postId', async(req, res) => {
    try {
        const postById = await Post.findById(req.params.postId)
        res.send(postById)
    } catch (err) {
        res.send({message:err})
    }
})


// Update a post
router.put('/:postId', verifyToken, async(req,res) =>{
    try{

        // check if the logged in user is the creator to allow update 
        const post = await Post.findById(req.params.postId);
        if (post.createdBy.toString() !== req.user._id) {
            return res.status(401).send({message:'Unauthorized'})
        }

        const updatePost = await Post.updateOne(
            {_id:req.params.postId},
            {$set:{
                title:req.body.title,
                description:req.body.description
                }
            })
        res.send(updatePost)
    }
    catch(err){
        res.send({message:err})
    }
})


// Delete a post 
router.delete('/:postId', verifyToken, async(req,res)=>{
    try{

        // check if the logged in user is the creator to allow delete 
        const post = await Post.findById(req.params.postId);
        if (post.createdBy.toString() !== req.user._id) {
            return res.status(401).send({message:'Unauthorized'})
        }

        const deletePost = await Post.deleteOne({_id:req.params.postId})
        res.send(deletePost)
    }
    catch(err){
        res.send({message:err})
    }
})


module.exports = router
