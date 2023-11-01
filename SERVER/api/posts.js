const express = require('express');
const postsRouter = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// <-------------getAll, getbyId create, update, delete posts-------->

//Get all posts
//GET request
postsRouter.get('/', async (req, res, next) => {
    try{
      const post = await prisma.post.findMany()
      res.send(post)
    }catch(error){
      next(error)
    }
})


//GET by id 
postsRouter.get('/:id',async (req, res, next) => {
  try{
    const post = await prisma.post.findUniqueOrThrow({
      where: {
        id: Number(req.params.id)
      }
    })
    res.send(post)
  }catch(error){
    next(error)
  }
})


//Create a new post 
postsRouter.post('/', async (req, res, next) => {
  try{ 
    const {title, content, authorId} = req.body
    const post = await prisma.post.create({
      data: {
          authorId,
          title,
          content,
      }
    })
    if(post) {
      res.send(post)
    }
    if(!post) {
      res.send({name: error, message:'there was an error creating your post'})
    }

  }catch(error){
    next(error)
  }
});


//Update a post
//PATCH request 

postsRouter.patch('/:id', async (req, res, next) => {
  const { title, content } = req.body;
  try{
    const post = await prisma.post.update({
      where: {
        id: Number(req.params.id),
        data: {
          title,
          content
        }
      }
    })
    res.send(post)
  }catch(error){
    next(error)
  }
});



//Delete a post 
postsRouter.delete('/:id', async (req, res, next) => {
  try{
    const post = await prisma.post.delete({
      where: {
        id: Number(req.params.id) 
      }
    })
    res.send(post)

  }catch(error){
    next(error)
  }
});



module.exports = postsRouter;