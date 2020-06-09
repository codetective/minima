const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const config = {
  app: {
    port: process.env.PORT || 9000,
  },
  auth: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
      const author = {
        role: decodedToken.role,
        userId: decodedToken.id,
      };

      User.findOne({ _id: author.userId })
        .then((user) => {
          if (user == null || author.role !== "admin") {
            res.json({
              status: "error",
              message: "unauthorized userId",
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
