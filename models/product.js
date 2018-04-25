//引入mongoose
var mongoose = require('mongoose');
//引用schema
var Schema = mongoose.Schema;

//主键生成器，每次添加数据时，自动生成
var shortid = require('shortid');

//声明product的schema描述文档信息（表的信息）
var ProductSchema = new Schema({
    _id : {
        type : String,
        unique : true,
        'default': shortid.generate
    },
    logo : String,
    cat_id : Number,
    brand_id : Number,
    title : {type:String, index:true},
    briefTitle : String,
    storageNum : Number,
    briefDesc : String,
    is_enable : {type : String, default:1},
    lineyear : String,
    linemonth : String,
    color : String,
    ios : String,
    screensize : String,
    beterysize : String,
    range : Number,
    tags : String,
    price : String,
    currentPrice : String,
    promotPrice : String,
    desc : String,
    pictures : String,
    saveDate : {type : Date, default : Date.now()},
    updateDate : {type : Date, default : Date.now()}
});

//由Schema生成一个Model
/**
 * Mongoose的model方法有四个参数：
 * 参数1：name为模型model的名称；
 * 参数2：schema为mongodb的document映射的schema；
 * 参数3：collection为真正的collection名称；
 * 参数4：skipInit为是否跳过初始化，默认为false.
 * 注意：当collection缺失时，该方法会将name参数根据一定的规则转换成Mongodb中的collection的名称，monogoose会自动追加一个复数s
 */
var Product = mongoose.model('Product', ProductSchema, 'product');

//最后，将User对象，生成一个模块
module.exports = Product;