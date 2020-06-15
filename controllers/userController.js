process.env.SECRET_KEY = "secret";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

const getUsers = (req, res) => {
  User.find(function (err, users) {
    if (err) {
      res.json(err);
    } else {
      res.json(users);
    }
  });
};

const getUser = (req, res) => {
  User.findOne({
    _id: req.body.id,
  })
    .then((author) => {
      if (!author) {
        res.json({
          status: "error",
          message: "user not found in database",
        });
      }
      res.json({
        name: author.name,
        email: author.email,
        bio: author.bio,
      });
    })
    .catch((err) => {
      res.json({
        error: err.message,
      });
    });
};

const regUsers = (req, res) => {
  const today = new Date();
  const userData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    created: today,
  };

  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash;
          User.create(userData)
            .then((user) => {
              res.json({
                status:
                  user.name +
                  " with email : " +
                  user.email +
                  " has been registered",
              });
            })
            .catch((err) => {
              res.send({
                error: err.message,
              });
            });
        });
      } else {
        res.json({
          error: user.email + " already exists",
        });
      }
    })
    .catch((err) => {
      res.send({
        error: err.message,
      });
    });
};

const loginUser = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (user) {
        const profile = {
          name: user.name,
          email: user.email,
          role: user.role,
          date: user.date,
        };
        if (bcrypt.compareSync(req.body.password, user.password)) {
          const payload = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
          let token = jwt.sign(payload, process.env.SECRET_KEY, {
            expiresIn: 999999,
          });
          res.send({
            status: "You have logged in successfully",
            token: token,
            profile,
          });
        } else {
          res.json({
            error: "User does not exist",
          });
        }
      } else {
        res.json({
          error: "User does not exist",
        });
      }
    })
    .catch((err) => {
      res.send({
        error: err.message,
      });
    });
};

const deleteUser = (req, res) => {
  User.findOne({ _id: req.body.id })
    .then(user => {      
      if (!user) {
        res.json({
          status: 'error',
          message: 'user not found'
        })
      } else {
         User.deleteOne({
           _id: req.body.id,
         })
           .then(
             res.json({
               status: "succesfully deleted account",
             })
           )
           .catch((err) => {
             res.json({
               error: err.message,
             });
           });
      }
    })
    .catch(err => {
      res.json({
        error: 'invalid user ID',
      });
  })
};

module.exports = {
  getUsers,
  regUsers,
  loginUser,
  getUser,
  deleteUser,
};
