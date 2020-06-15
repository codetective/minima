const express = require("express");
const cors = require("cors");
const router = express.Router();
const config = require("../config/config");
const {
  addPost,
  getPost,
  getPosts,
  editPost,
  deletePost,
} = require("../controllers/postController");
router.use(cors());


router.get('/', getPosts)
router.get('/post', getPost)
router.post('/add',config.postAuth, addPost)
router.put('/edit',config.postAuth, editPost)
router.delete('/delete', config.postAuth, deletePost)

module.exports = router