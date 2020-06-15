const Post = require("../models/postModel");

let addPost, getPosts, getPost, editPost, deletePost;

addPost = (req, res) => {
  const newPost = {
    title: req.body.title,
    body: req.body.body,
    author: res.locals.user,
    blockquote: req.body.blockquote,
  };

  Post.create(newPost)
    .then((post) => {
      res.json({
        status: "success",
        message: "post created sucessfully",
      });
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
};
getPosts = (req, res) => {
  Post.find((err, posts) => {
    if (err) {
      res.json({
        error: err.message,
      });
    } else {
      res.json({
        posts,
      });
    }
  });
};
getPost = (req, res) => {
  Post.findOne({ _id: req.body.id })
    .then((post) => {
      if (!post) {
        res.json({
          error: "post not found in database",
        });
      }
      res.json({
        post,
      });
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
};
editPost = (req, res) => {
  const postUpdate = {
    title: req.body.title,
    body: req.body.body,
    blockquote: req.body.blockquote,
    author: res.locals.user
  };

  Post.findOneAndUpdate(req.body.id, postUpdate, { new: true, useFindAndModify: false })
    .then(post => {
      res.json({
        status: 'sucess',
        post
    })
    })
    .catch(err => {
      res.json({
        status: 'failed',
        error: err.message
    })
  })
  
 };

deletePost = (req, res) => {
  Post.findOne({ _id: req.body.id })
    .then((post) => {
      if (!post) {
        res.json({
          status: "error",
          message: "post not found",
        });
      } else {
        Post.deleteOne({
          _id: req.body.id,
        })
          .then(
            res.json({
              status: "succesfully deleted post",
            })
          )
          .catch((err) => {
            res.json({
              error: err.message,
            });
          });
      }
    })
    .catch((err) => {
      res.json({
        error: "invalid post ID",
      });
    });
};

module.exports = {
  addPost,
  getPost,
  getPosts,
  editPost,
  deletePost,
};
