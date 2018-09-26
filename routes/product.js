require('dotenv').config();
var express = require('express');
var productRouter = express.Router();
const bcrypt = require("bcrypt");
const passport = require('passport');

const User = require('../models/user');
const Product = require('../models/product');
// const Charge = require('../models/charge');
const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);

const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');

productRouter.get('/products/create', (req, res, next) => {
    res.render('products/create');
});

productRouter.post('/products/create', function(req, res, next){
    (async function () {
        const product = await stripe.products.create({
            name: 'My SaaS Platform 3',
            type: 'service',
          });
        const newProduct = new Product({
            description: req.body.description,
            stripeProduct: product
        });
        newProduct.save();
    })();
    res.redirect('/products/create');
});


module.exports = productRouter;