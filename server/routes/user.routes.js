import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
const passport = require('passport');
const router = new Router();

// register user
router.route('/register').post(UserController.registerUser);

// auth user
router.route('/login').post(UserController.loginUser);

// Get current user
// router.route('/current', passport.authenticate('jwt', { session: false })).get(UserController.getUser);

router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
    });
  }
);

export default router;
