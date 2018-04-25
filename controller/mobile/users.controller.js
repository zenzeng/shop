var express = require('express');
var app = express();


//加载config配置文件
app.config = require(__dirname + '/../../config/config');

var UserModel = require(app.config.root + '/models/user');

//基本信息页
exports.profile = function (req, res) {
    res.render('mobile/profile', {pageTitle: '个人信息', title: app.config.siteName});
}

//修改密码
exports.changepw = function (req, res) {
    res.render('mobile/changepw', {pageTitle: '修改密码', title: app.config.siteName});
}

//账号管理
exports.account = function (req, res) {
    res.render('mobile/account', {pageTitle: '账户管理', title: app.config.siteName});
}

//用户中心页面
exports.usercenter = function (req, res) {
    res.render('mobile/usercenter', {pageTitle: '用户中心', title: app.config.siteName});
}

//显示登录页
exports.login = function (req, res) {
    res.render('mobile/login', {title: app.config.siteName});
}

//处理登录逻辑
exports.dologin = function (req, res) {
    console.log('----todo---/users/dologin----------');
}

//显示注册页
exports.register = function (req, res) {
    res.render('mobile/register', {title: app.config.siteName});
}

//处理注册逻辑
exports.doregister = function (req, res) {
    console.log('----todo---/users/doregister----------');
}

//收货地址管理
exports.addresslist = function (req, res) {
    res.render('mobile/addresslist', {pageTitle: '收货地址', title: app.config.siteName});
}

//编辑地址管理
exports.addressedit = function (req, res) {
    res.render('mobile/addressedit', {pageTitle: '编辑收货地址', title: app.config.siteName});
}

//退出
exports.logout = function (req, res) {
    req.logout();
    res.redirect('/users/login');
}

/* GET home page. */
exports.center = function (req, res, next) {

    var userEntity = new UserModel({
        username: 'maomao',
        age: 12
    });

    userEntity.save(function (err, res) {
        if (err) console.log(err);
        else console.log(res);
    });

    UserModel.find(function (err, res) {
        console.log(res);
    });

    res.render('mobile/index', {siteName: app.config.siteName});
}

