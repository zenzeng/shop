var express = require('express');
var app = express();

//加载config配置文件
app.config = require( __dirname + '/../../config/config');
var UserModel = require(app.config.root + '/models/user');

//我的订单列表
exports.myorder = function (req, res) {
    res.render('mobile/myorder', {pageTitle : '我的订单',  title : app.config.siteName});
}

//我的订单详情
exports.myorderinfo = function (req, res) {
    res.render('mobile/myorderinfo', {pageTitle : '订单详情',  title : app.config.siteName});
}

//提交订单
exports.ordersubmit = function (req, res) {
    res.render('mobile/ordersubmit', {pageTitle : '提交订单',  title : app.config.siteName});
}
