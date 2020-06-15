const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const Post = require("../models/postModel");


const config = {
  app: {
    port: process.env.PORT || 9000,
  },
  admin: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const author = {
        role: decodedToken.role,
        userId: decodedToken.id,
        name: decodedToken.name,
      };

      User.findOne({ _id: author.userId })
        .then((user) => {
          if (author.role !== "admin") {
            res.json({
              status: "error",
              message: "unauthorized for this action",
            });
          } else {
            res.locals.user = author;
            next();
          }
        })
        .catch((err) => {
          res.json({
            error: err.message,
          });
        });
    } catch (err) {
      res.status(401).json({
        error: err.message,
      });
    }
  },

  auth: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const author = {
        role: decodedToken.role,
        userId: decodedToken.id,
        name: decodedToken.name,
      };
      Post.findOne({ _id: req.body.id })
        .then((post) => {
          if (post.author.userId !== author.userId) {
            res.json({
              status: "error",
              message: "user is unauthorized for this action",
            });
          } else {
            res.locals.user = author;
            next();
          }
        })
        .catch((err) => {
          res.json({
            error: err.message,
          });
        });
    } catch (err) {
      res.status(401).json({
        error: err.message,
      });
    }
  },

  postAuth: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const author = {
        role: decodedToken.role,
        userId: decodedToken.id,
        name: decodedToken.name,
      };

      User.findOne({ _id: author.userId })
        .then((user) => {
          if (user == null) {
            res.json({
              status: "error",
              message: "unauthorized for this action",
            });
          } else {
            res.locals.user = author;
            next();
          }
        })
        .catch((err) => {
          res.json({
            error: err.message,
          });
        });
    } catch (err) {
      res.status(401).json({
        error: err.message,
      });
    }
  },
};

module.exports = config;
