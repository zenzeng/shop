var express = require('express');
var app = express();

//加载config配置文件
//app.config = require( __dirname + '/../../config/config');
//var UserModel = require(app.config.root + '/models/user');

exports.ajaxUserAdd = function(req, res, next) {

    /*var userEntity = new UserModel({
        username : 'maomao',
        age : 12
    });

    userEntity.save(function (err, res) {
        if(err) console.log(err);
        else console.log(res);
    });

    UserModel.find(function (err, res) {
        console.log(res);
    });*/

    var result = {
        // `data` 由服务器提供的响应
        data: {'res':'111'},
        // `status` 来自服务器响应的 HTTP 状态码
        status: 200,
        // `statusText` 来自服务器响应的 HTTP 状态信息
        statusText: 'OK',
        // `config` 是为请求提供的配置信息
        config: {}
    }

    res.write(JSON.stringify(result));
    res.end();

    //res.render('mobile/index', { siteName: app.config.siteName });
}