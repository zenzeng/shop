/**
 * 这是一个全局的配置文件
 * 这里会以json的形式，存放所有全局需要的参数和变量
 */

var path = require('path');
var root = path.normalize(__dirname + '/..');

var config = {
    root : root,
    app: {
        name: 'shop'
    },
    server: {
        port: process.env.PORT || 3000,
        hostname: process.env.HOSTNAME || '127.0.0.1'
    },
    siteName :　"NodeJS商城系统",
    database: {
        user: '',
        password: '',
        host: 'localhost',
        port: '27017',
        db: 'web',
        url: 'mongodb://localhost:27017/web'
    },
    originHost : 'http://127.0.0.1:8086',
    baseHost : 'http://127.0.0.1:3000',
}

//将config模块化给调用的地方
module.exports = config;
