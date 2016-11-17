/**
 * Created by Administrator on 2016/11/17.
 */

var mongoDB = require('mongoose');
//使用nodejs中内置的promise实现替换
mongoDB.Promise = Promise;
mongoDB.connect('mongodb://localhost/blog_db');
var Schema = mongoDB.Schema;

var blogTypeSchema = new Schema({
    name: {
        type: String,
        default: ''
    },
    description: {
        type: String,
        default: ''
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

var BlogTypeSchema = mongoDB.model('blog_type', blogTypeSchema);


module.exports = {
    BlogTypeSchema: BlogTypeSchema
}