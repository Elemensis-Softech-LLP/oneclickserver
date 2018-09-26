require('dotenv').config();
var express = require('express');
var planRouter = express.Router();
const bcrypt = require("bcrypt");
const passport = require('passport');

const User = require('../models/user');
const Product = require('../models/product');
const Plan = require('../models/plan');
// const Charge = require('../models/charge');
const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);

const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');

planRouter.get('/plans/create', (req, res, next) => {
    Product.find({},(err, data) => {
        if(err) {
            res.render('error')
          } else {
            res.render('plans/create', {'products': data});
          }
    })
});

planRouter.post('/plans/create', function(req, res, next){
    // console.log(req.body.product)
    (async() => {
        let product = await Product.findOne({
            "_id": req.body.product
        }); 
        const stripePlan = await stripe.plans.create({
            product: product.stripeProduct.id,
            nickname: 'Masternode hosting service',
            currency: 'usd',
            interval: 'month',
            amount: 10000,
          });
        const newPlan = new Plan({
            stripePlan: stripePlan,
            product: product
        })
        newPlan.save();
    })();
    res.redirect('/plans/create');
});


module.exports = planRouter;