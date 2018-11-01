import User from '../models/user';

const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config.js');
const validateRegisterInput = require('../validation/register.js');
const validateLoginInput = require('../validation/login.js');

/**
 * Save a user
 * @param req
 * @param res
 * @returns void
 */
export function registerUser(req, res) {
  const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        errors.email = 'Email already exists';
        res.status(400).json(errors);
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        });

        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          avatar,
          password: req.body.password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (errs, hash) => {
            if (errs) throw errs;
            newUser.password = hash;
            newUser
              .save()
              .then(users => res.json(users))
              .catch(errorss => console.log(errorss));
          });
        });
      }
    });
  }
}

/**
 * User Auth
 * @param req
 * @param res
 * @returns void
 */
export function loginUser(req, res) {
  console.log(req.body);
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    res.status(400).json(errors);
  } else {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({
      email,
    }).then(user => {
      if (!user) {
        errors.email = 'User not found';
        res.status(404).json(errors);
      } else {
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            const payload = { id: user.id, name: user.name, avatar: user.avatar };

            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 360000 },
              (err, token) => {
                res.json({
                  success: true,
                  token: 'Bearer ' + token, /* eslint prefer-template: 0 */
                });
              }
            );
          } else {
            errors.password = 'Password incorrect';
            res.status(400).json(errors);
          }
        });
      }
    });
  }
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getUser(req, res) {
  console.log(req.user);
  res.json({
    id: req.user ? req.user.id : '',
    name: req.user ? req.user.name : '',
    email: req.user ? req.user.email : '',
  });
}
