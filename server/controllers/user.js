const User = require("../models/user");
const { normalizeErrors } = require("../helpers/mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");

exports.auth = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      errors: [{ title: "Data missing", detail: "Provide email and password!" }]
    });
  }

  User.findOne({ email }, (err, user) => {
    if (err) {
      return notAuthorized(res);
    }
    if (!user) {
      return res.status(422).send({
        errors: [{ title: "Data Invalid User", detail: "User doesn't exist!" }]
      });
    }
    if (user.hasSamePassword(password)) {
      const token = jwt.sign(
        {
          userId: user.id,
          username: user.username
        },
        config.SECRET,
        { expiresIn: "1h" }
      );
      return res.json(token);
    } else {
      return res.status(422).send({
        errors: [{ title: "Wrong Data", detail: "Wrong email or password!" }]
      });
    }
  });
};

exports.register = (req, res) => {
  const { username, email, password, passwordConfirmation } = req.body;

  if (!email || !password) {
    return res.status(422).send({
      errors: [{ title: "Data missing", detail: "Provide email and password!" }]
    });
  }

  if (password !== passwordConfirmation) {
    return res.status(422).send({
      errors: [
        {
          title: "Password doesn't match",
          detail: "Provide the same passwords!"
        }
      ]
    });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return res.status(422).send({
        mongose: "handle errors"
      });
    }
    if (existingUser) {
      return res.status(422).send({
        errors: [
          {
            title: "Invalid email",
            detail: "The user with given email already exists!"
          }
        ]
      });
    }

    const user = new User({ username, email, password });
    user.save(err => {
      if (err) {
        return notAuthorized(res);
      }

      return res.json({ registered: true });
    });
  });
};

exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token.split(" ")[1], config.SECRET, function(err, user) {
      if (err) {
        return res.status(401).send({
          errors: [
            {
              title: "Not authenticated",
              detail: "Your session has been expired!"
            }
          ]
        });
      }

      User.findById(user.userId, (err, user) => {
        if (err) {
          return notAuthorized(res);
        }
        if (user) {
          res.locals.user = user;
          next();
        } else {
          return res.status(422).send({
            errors: [
              {
                title: "Not authorized",
                detail: "You need to login to get access!"
              }
            ]
          });
        }
      });
    });
  } else {
    return res.status(422).send({
      errors: [
        {
          title: "Not authorized",
          detail: "You need to login to get access!"
        }
      ]
    });
  }
};

function notAuthorized(res) {
  return res.status(401).send({ errors: normalizeErrors(err.errors) });
}
