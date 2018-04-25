var express = require('express');
var app = express();

var multiparty = require('multiparty');
var util = require('util');
var fs = require('fs');

//加载config配置文件
app.config = require( __dirname + '/../../config/config');

exports.upload = function (req, res, next) {

    //生成multiparty对象，并配置上传目标路径
    var form = new multiparty.Form({uploadDir: app.config.root + '/public/files/'});
    //上传完成后处理
    form.parse(req, function(err, fields, files) {
        var filesTmp = JSON.stringify(files,null,2);

        if(err){
            console.log('parse error: ' + err);
        } else {
            console.log('parse files: ' + filesTmp);
            var inputFile = files.file[0];
            var uploadedPath = inputFile.path;
            var dstPath = app.config.root + '/public/files/' + inputFile.originalFilename;
            //重命名为真实文件名
            fs.rename(uploadedPath, dstPath, function(err) {
                if(err){
                    var result = {status:'fail', url:''};
                    res.end(JSON.stringify(result));
                } else {
                    var result = {status:'ok', url: '/files/'+inputFile.originalFilename };
                    res.end(JSON.stringify(result));
                }
            });
        }

        //res.writeHead(200, {'content-type': 'text/plain;charset=utf-8'});
        //res.write('received upload:\n\n');
        //res.end(util.inspect({files: filesTmp}));
    });

}

/* GET home page. */
exports.home = function(req, res, next) {

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