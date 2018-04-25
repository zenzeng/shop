var express = require('express');
var app = express();

//加载config配置文件
app.config = require( __dirname + '/../../config/config');
var ProductModel = require(app.config.root + '/models/product');

class Product{

    constructor(){
    }

    //所有商品页
    list(req, res) {
        res.render('mobile/list', {pageTitle : '所有商品',  title : app.config.siteName});
    }

    //商品分类页
    cat(req, res) {
        res.render('mobile/category', {pageTitle : '商品分类',  title : app.config.siteName});
    }

    //购物车
    cart(req, res) {
        res.render('mobile/cart', {pageTitle : '商品详情',  title : app.config.siteName});
    }

    //商品详情页
    info(req, res) {
        var where = {_id : 'B1OleOWcZ'};
        ProductModel.findOne(where, function (err, data) {
            console.log(data);
            res.render('mobile/info', {pageTitle : '商品详情',  title : app.config.siteName, info:data});
        })

    }
}

module.exports = Product;

