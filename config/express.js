/**
 * 这里用来管理所有和express相关的组件和中间件
 */
"use strict";

var fs = require('fs');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var pkg = require('../package.json');

//以下3个是和passport相关的模块
var session = require('express-session');
var validator = require('express-validator');
var passport = require('passport');
//从helper中引用passport.js
require('../helper/passport.js');

var flash = require('connect-flash');
//express默认使用jade模板，可以配置让其支持使用ejs或html模板
var ejs = require('ejs');

/**
 * 这里用来设置express的加载内容
 * @param app  app是传过来的参数，代表express()的对象
 * @param express  express是传过来的参数，代表引入的expree对象
 */
module.exports = function (app, express) {

    //加载config配置文件
    app.config = require('../config/config');

    // 静态资源文件目录指定public
    app.use(express.static(path.join(__dirname, '/../public')));

    var accessLog = fs.createWriteStream('access.log', {flags: 'a'})
    var errorLog = fs.createWriteStream('error.log', {flags : 'a'});
    app.use(logger('combined', {stream : accessLog}));      //打印到log日志
    app.use(logger('dev'));     //打印到控制台

    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(cookieParser());

    //这个是用于express中表单提交数据验证的
    app.use(validator());
    
    /** --sesssion会话配置信息--start-- */
    var opts = {
        name: [pkg.name, app.config.app.name, '.sid'].join(),
        proxy: true,
        resave: true,
        saveUninitialized: true,
        secret: pkg.name + app.config.app.name,
        unset: 'destroy',
        cookie: {
            maxAge: 3600 * 1000
        }
    };
    app.use(session(opts));
    //对session操作的模块，应在session实例下面
    app.use(flash());
    //初始化调用 passport
    app.use(passport.initialize());
    app.use(passport.session());
    /** --sesssion会话配置信息--end-- */

    // 设置模板存放的目录
    app.set('views', path.join(__dirname, '/../views'));
    //jade是express框架默认的模板引擎
    //app.set('view engine', 'jade');

    //使用html作模板引擎
    app.engine('html', ejs.__express);
    app.set('view engine', 'html');

    //加载一个用户验证的拦截器
    /*app.use(function (req, res, next) {
        console.log('------1111111----------');
        res.locals.login = req.isAuthenticated();
        console.log('------22222222----------');
        next();
    });*/

    app.use(function(err,req,res,next) {
        console.log("Error happens", err.stack);
    });

    //加载路由（也就是控制器）
    var index = require('../controller/mobile/index');
    var users = require('../controller/mobile/users');
    var product = require('../controller/mobile/product');
    var order = require('../controller/mobile/order');

    app.use('/', index);  //此为根路径下所有的路由
    app.use('/users', users); //此为所有用户user相关的路由
    app.use('/product', product); //此为所有商品product相关的路由
    app.use('/order', order); //此为所有订单order相关的路由

    var admin = require('../controller/admin/index');
    var adminUser = require('../controller/admin/user');
    var adminProduct = require('../controller/admin/product');
    var adminOrder = require('../controller/admin/order');

    app.use('/api', admin); //此为所有后台admin相关的路由
    app.use('/api/user', adminUser);
    app.use('/api/product', adminProduct);
    app.use('/api/order', adminOrder);
}


