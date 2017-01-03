var config = require('./config'),
    mongoose = require('mongoose');

module.exports = function () {
    var db = mongoose.connect(config.db);
    require('../app/models/cart.js');
    require('../app/models/order.js');
    require('../app/models/product.js');
    require('../app/models/user.js');


    return db;
};