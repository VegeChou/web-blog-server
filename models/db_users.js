var mongoose = require('mongoose');
/*
{ 
    "_id" : ObjectId( "55e6b65c42651e4d42ec7ec4" ),
    "email:"weizhi_0213@163.com",
    "username" : "vega",
    "password" : "123456",
    "authorization" : ["admin"],
    "created_time" : 1441183288 
}
*/
var schema = module.exports = new mongoose.Schema({
    email:String,
    username: String,
    password: String,
    authorization: [String],
    created_time: {
        type: Date,
        default: Date.now
    },
    del: {
        type: String,
        default: '0'
    }
});

if (!schema.options.toJSON) {
    schema.options.toJSON = {};
}
schema.options.toJSON.transform = function(doc, ret) {
    ret.created_time = ret.created_time && ret.created_time.valueOf();
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
};

var mongoose = require('mongoose');
mongoose.connect('localhost','manager-platform'); //创建一个数据库连接
var Db_users = module.exports = mongoose.model("Db_users",schema);

global['Db_users'] = Db_users;
