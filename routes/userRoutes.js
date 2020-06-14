const express = require("express");
const cors = require("cors");
const router = express.Router();
const config = require('../config/config')

const {
  getUsers,
  regUsers,
  loginUser,
  getUser,
  deleteUser,
} = require("../controllers/userController");
router.use(cors());
const User = require("../models/userModel");

//Get Registered Users
router.get("/authors", getUsers);
router.get("/author", getUser);

//Register New User
router.post("/append",config.admin, regUsers);

//Login Route Four Users
router.post("/login", loginUser);

router.delete("/terminate", config.admin, deleteUser);

module.exports = router;
