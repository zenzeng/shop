"use strict";

var express = require('express');
var app = express();
var router = express.Router();

//加载config配置文件
app.config = require(__dirname + '/../../config/config');
//var passport = require(app.config.root + '/helper/passport.js');
var passport = require('passport');

//默认页面引用
var defaultCtrl = require('./users.controller');

//如果有很多页面需要保护，可以抽象出此部分逻辑放到一个function中。
//然后把这个function放到router.get的callback chain里即可
var isAuthenticated = function (req, res, next) {
    console.log('--isAuthenticate---' + req.isAuthenticated());
    if (req.isAuthenticated()) return next();
    res.redirect('/users/login');
}

/* GET home page. */
router.get('/', isAuthenticated, defaultCtrl.center)
    .get('/login', defaultCtrl.login)
    .post('/dologin', passport.authenticate('local.login', {
        successRedirect: '/users/center',
        failureRedirect: '/users/login',
        failureFlash: true
    }), defaultCtrl.dologin)
    .get('/register', defaultCtrl.register)
    .post('/doregister', passport.authenticate('local.register', {
        successRedirect: '/users/center',
        failureRedirect: '/users/login',
        failureFlash: true
    }), defaultCtrl.doregister)
    .get('/center', isAuthenticated, defaultCtrl.usercenter)
    .get('/account', isAuthenticated, defaultCtrl.account)
    .get('/profile', isAuthenticated, defaultCtrl.profile)
    .get('/changepw', isAuthenticated, defaultCtrl.changepw)
    .get('/addresslist', isAuthenticated, defaultCtrl.addresslist)
    .get('/addressedit', isAuthenticated, defaultCtrl.addressedit)
    .get('/logout', isAuthenticated, defaultCtrl.logout);

module.exports = router;