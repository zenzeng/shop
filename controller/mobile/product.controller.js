var express = require('express');
var app = express();

//加载config配置文件
app.config = require( __dirname + '/../../config/config');
var ProductModel = require(app.config.root + '/models/product');

//所有商品页
exports.list = function (req, res) {
    res.render('mobile/list', {pageTitle : '所有商品',  title : app.config.siteName});
}

//商品分类页
exports.cat = function (req, res) {
    res.render('mobile/category', {pageTitle : '商品分类',  title : app.config.siteName});
}

//购物车
exports.cart = function (req, res) {
    res.render('mobile/cart', {pageTitle : '商品详情',  title : app.config.siteName});
}

//商品详情页
exports.info = function (req, res) {
    var where = {_id : 'B1OleOWcZ'};
    ProductModel.findOne(where, function (err, data) {
        console.log(data);

        //如果在mongoose返回的对象中，增加新的属性的时候，需要toObject()一下
        var result = data.toObject();
        result.picturesList = data.pictures.split(',');
        /**
        //这是for循环的用法
        for(var i=0; i <result.picturesList.length; i++ ){
            result.picturesList[i] = app.config.baseHost + result.picturesList[i];
        }
        */
        //这是forEach循环的用法
        result.picturesList.forEach(function(ele, i){
            result.picturesList[i] = app.config.baseHost + ele;
        });

        console.log(result);
        res.render('mobile/info', {pageTitle : '商品详情',  title : app.config.siteName, info:result});
    })

}
