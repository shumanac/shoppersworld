var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var nodemailer = require("nodemailer");

var Product = require('../models/product');
var Order = require('../models/order');



/* GET home page. */
router.get('/', function (req, res, next) {
    var successMsg = req.flash('success')[0];
Product.find(function (err, docs) {
    var productChunks = [];
    var chunkSize = 3;
    for (var i = 0; i < docs.length; i += chunkSize){
        productChunks.push(docs.slice(i, i + chunkSize));
    }
    
    res.render('shop/index', {
        title: 'Shopping Cart',
        products: productChunks, successMsg: successMsg, noMessages: !successMsg
    });
});

});
router.get('/add-to-cart/:id', function(req, res, next){
    var producntId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    
    Product.findById(producntId, function(err, product){
        if(err){
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/');
    });
});
router.get('/shopping-cart', function(req, res, next){
    if(!req.session.cart){
        return res.render('shop/shopping-cart', {products: null});
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/shopping-cart', {products: cart.generateArray(), totalPrice: cart.totalPrice});
});
//router.get('/tobuy',function(req,res){
//res.sendfile('tobuy.hbs');
//});

router.get('/tobuy', function(req, res, next){
    if(!req.session.cart){
        return res.redirect('/shopping-cart');
    }
    var cart = new Cart(req.session.cart);
    var errMsg = req.flash('error')[0];
    res.render('shop/tobuy', {total: cart.totalPrice, products: cart.generateArray(), errMsg: errMsg, noError: !errMsg});
    console.log(cart.generateArray());
});





router.get('/send',function(req,res){
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: user,
        pass: password
    }
});
//    smtpTransport.sendMail({
//        from: user,
//        to: 'shumana.chowdhury186@gmail.com',
//        subject: 'test',
//        html: '<div style="text-align"center;background:blue; color:white">'
//    });
//    res.redirect('/');
//    
    var mailOptions={
   to : req.query.to,
   subject : req.query.subject,
   text : req.query.text
}
console.log(mailOptions);
smtpTransport.sendMail(mailOptions, function(error, response){
if(error){
console.log(error);
res.end("error");
}else{
console.log("Message sent: " + response.message);
req.flash('success', "Successfully bought product");
//res.end("sent");
}
});
    
    var order = new Order({
        user: req.user,
        cart: cart,
        message: req.body.message
    })
    
});
module.exports = router;

//router.get('/checkout', function(req, res, next){
//    if(!req.session.cart){
//        return res.redirect('/shopping-cart');
//    }
//    var cart = new Cart(req.session.cart);
//    var errMsg = req.flash('error')[0];
//    res.render('shop/checkout', {total: cart.totalPrice, errMsg: errMsg, noError: !errMsg});
//});
//
//router.post('/checkout', function(req, res, next){
//    if(!req.session.cart){
//        return res.redirect('/shopping-cart');
//    }
//    var cart = new Cart(req.session.cart);
//    
//    var stripe = require("stripe")(
//  "sk_test_6G1lpMjfxdQqZHRqSutY07uY"
//);
//
//
//    
//stripe.charges.create({
//  amount: cart.totalPrice * 100,
//  currency: "usd",
//  source: req.body.stripeToken, // obtained with Stripe.js
//    
//  description: "Test Charge"
//}, function (err, charge) {
//    if(err){
//        req.flash('error', err.message);
//        return res.redirect('/checkout');
//    }
//    req.flash('success', "Successfully bought product");
//    req.session.cart = null;
//    res.redirect('/');
//  
//});
//    
//    
//    stripe.customers.create({
//  source: req.body.stripeToken,
//}).then(function (customer) {
//    stripe.charge.create({
//       amount:cart.totalPrice * 100,
//       currency: 'usd',
//         description: "Test Charge",
//       customer: customer.id 
//    },function(err, charge) {
//    if(err){
//        req.flash('error', err.message);
//        return res.redirect('/checkout');
//    }
//    req.flash('success', "Successfully bought product");
//     req.session.cart = null;
//    res.redirect('/');
//  
//});
//});
//});
