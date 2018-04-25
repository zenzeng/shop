var express = require('express');
var app = express();

//加载config配置文件
app.config = require( __dirname + '/../../config/config');
var ProductModel = require(app.config.root + '/models/product');

exports.ajaxProductDelete = function (req, res, next) {
    //第一步：接收前台异步请求过来的参数，post：使用req.body.XXX得到参数，get直接获取
    var id = req.body.id;
    console.log('--->>>>>>>>>>>>>>:' + id);

    //第二步：区分批量删除和单条删除，批量删除接收的数据格式如：XXX,XXX,  单条数据直接处理
    var where = {};
    if(id.indexOf(',') > -1){
        //第二步-1：批量删除的时候，处理
        //因为上面的参数id：格式是这样的xxx,xxx,  所以需要使用substring将最后一个,去掉
        //因为批量删除，需要使用$in的语法：{字段名：{$in : ["xxx", "xxx"]}}，所以处理如下
        var idArr = id.substring(0, id.length-1).split(',');
        where = {_id : {$in : idArr}};
    }else{
        //第二步-2：单个删除的处理
        where = {_id: id};
    }

    //第三步：使用model对象下面的remove通用删除方法，进行删除，注意参数1为where
    ProductModel.remove(where, function (err, data) {
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

exports.ajaxProductList = function (req, res, next) {
    var where = {};
    var page = {};

    //模糊搜索查询
    var keywords = req.body.keywords;
    if(keywords){
        var reqExp = new RegExp(keywords, 'i');//模糊查询参数，等同于正则：/字符串/i
        where = {'title':{$regex:reqExp}};
        console.log(where);
    }

    //分页数据查询
    page.currentPage = req.body.page;
    page.pageSize = 1;
    page.start = page.pageSize * (page.currentPage - 1);

    ProductModel.count(where, function (err, count) {
        console.log(count);

        ProductModel.find(where).skip(page.start).limit(page.pageSize).exec(function (err, products) {
            /* 多行记录的时候，通过map循环，对每一行进行toObject
            var data = products.map(function (product, id) {
                var mo = product.toObject();
                mo.logo = "<img src='"+mo.logo+"'>";
                return mo;
            });*/
            var result = {
                list: products,
                count : count,
                status: 200,
                statusText: 'OK',
                config: {}
            }
            res.write(JSON.stringify(result));
            res.end();
        });
    });
}

exports.ajaxProductAdd = function(req, res, next) {

    var ProductEntity = new ProductModel(req.body);

    ProductEntity.save(function (err, res) {
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