var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('localhost:27017/shopping');
var products = [

    new Product({
        imagePath: '../../../images/product/cap-1.jpg',
        title: 'Cap',
        description: 'Awesome!!!!!!!',
        price: 10
    }),

      new Product({
        imagePath: '../../../images/product/cap-1.jpg',
        title: 'Cap',
        description: 'Awesome!!!!!!!',
        price: 10
    }),
      new Product({
        imagePath: '../../../images/product/cap-1.jpg',
        title: 'Cap',
        description: 'i died!!!!!!!',
        price: 10
    }),
         new Product({
        imagePath: '../../../images/product/cap-1.jpg',
        title: 'Cap',
        description: 'Awesome!!!!!!!',
        price: 10
    }),
      new Product({
        imagePath: '../../../images/product/cap-1.jpg',
        title: 'Cap',
        description: 'i died!!!!!!!',
        price: 10
    }),

];
var done = 0;

for (var i = 0; i < products.length; i++) {
    products[i].save(function (err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}