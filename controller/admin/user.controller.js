var express = require('express');
var app = express();

//加载config配置文件
app.config = require( __dirname + '/../../config/config');
var UserModel = require(app.config.root + '/models/user');

exports.ajaxUserInfo = function (req, res, next) {
    var where = {_id:req.body.id};

    UserModel.findOne(where, function (err, data) {
        console.log(data);
        var result = {
            // `data` 由服务器提供的响应
            list: data,
            // `status` 来自服务器响应的 HTTP 状态码
            status: 200,
            // `statusText` 来自服务器响应的 HTTP 状态信息
            statusText: 'OK',
            // `config` 是为请求提供的配置信息
            config: {}
        }

        res.write(JSON.stringify(result));
        res.end();
    });
}

exports.ajaxUserEdit = function (req, res, next) {
    var where = {_id: req.body.id};
    var updateJson = { $set : {
        logo : req.body.logo,
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        mobile : req.body.mobile,
        qq : req.body.qq,
        region_id :  req.body.region_id,
        address : req.body.address,
        birthday :  req.body.birthday,
        sex :  req.body.sex,
        tag :  req.body.tag,
        desc :  req.body.desc,
        is_enable :  req.body.is_enable,
    } };

    UserModel.update(where, updateJson, function (err, data) {
        var r = 'Fail';
        if(!err) r = 'OK';

        var result = {
            // `data` 由服务器提供的响应
            list: '',
            // `status` 来自服务器响应的 HTTP 状态码
            status: 200,
            // `statusText` 来自服务器响应的 HTTP 状态信息
            statusText: r,
            // `config` 是为请求提供的配置信息
            config: {}
        }

        res.write(JSON.stringify(result));
        res.end();
    });

}

exports.ajaxUserDelete = function (req, res, next) {

    var where = {};
    var id = req.body.id;

    console.log('---->>>>>>>>>>：---' +id);

    if(id.indexOf(',') > -1){
        var reqParam = '[';
        var reqParam = id.substring(0, id.length-1).split(',');
        console.log('---->>>>>>>>>>：---' +reqParam);
        where = {_id : {$in : reqParam}};
    }else{
        where = {_id : id};
    }

    UserModel.remove(where, function (err, data) {

        //UserModel.findByIdAndRemove(req.body.id, function (err, data) {

        var r = 'Fail';
        if(!err) r = 'OK';

        var result = {
            // `data` 由服务器提供的响应
            list: '',
            // `status` 来自服务器响应的 HTTP 状态码
            status: 200,
            // `statusText` 来自服务器响应的 HTTP 状态信息
            statusText: r,
            // `config` 是为请求提供的配置信息
            config: {}
        }

        res.write(JSON.stringify(result));
        res.end();
    });
}

exports.ajaxUserList = function (req, res, next) {
    var where = {};

    //模糊搜索查询
    var keywords = req.body.keywords;
    console.log('->>>>>>>>>>>>>---111 :' + keywords);
    if(keywords){
        var reqExp = new RegExp(keywords, 'i');//模糊查询参数，等同于正则：/字符串/i
        //mongoose中模糊语法：{'字段名'：{$regex : /关键字/i}}
        where = {'username':{$regex: reqExp}};
        console.log("----where条件开始----");
        console.log(where);
        console.log("----where条件结束----");
    }

    //分页数据查询
    var page = {};
    page.currentPage = req.body.page;
    page.pageSize = 2;
    page.start = page.pageSize * (page.currentPage - 1);

    UserModel.count(where, function (err, count) {
        console.log(count);

         UserModel.find(where).skip(page.start).limit(page.pageSize).exec(function (err, users) {

                var result = {
                    // `data` 由服务器提供的响应
                    list: users,
                    // `status` 来自服务器响应的 HTTP 状态码
                    count : count,
                    status: 200,
                    // `statusText` 来自服务器响应的 HTTP 状态信息
                    statusText: 'OK',
                    // `config` 是为请求提供的配置信息
                    config: {}
                }

                res.write(JSON.stringify(result));
                res.end();
         });
    });
}

exports.ajaxUserAdd = function(req, res, next) {

    var userEntity = new UserModel({
        logo : req.body.logo,
        username : req.body.username,
        password : req.body.password,
        email : req.body.email,
        mobile : req.body.mobile,
        qq : req.body.qq,
        region_id :  req.body.region_id,
        address : req.body.address,
        birthday :  req.body.birthday,
        sex :  req.body.sex,
        tag :  req.body.tag,
        desc :  req.body.desc,
        is_enable :  req.body.is_enable,
    });

    userEntity.save(function (err, res) {
        if(err) console.log(err);
        else console.log(res);
    });

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