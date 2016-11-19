/**
 * Created by Administrator on 2016/11/17.
 */

var mongoDB = require('mongoose');
//使用nodejs中内置的promise实现替换
mongoDB.Promise = Promise;
mongoDB.connect('mongodb://localhost/blog_db');
var Schema = mongoDB.Schema;

//blog_type表模型
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

//格式化时间
blogTypeSchema.methods.getCreateDate = function () {
    var year = this.created_at.getFullYear();
    var month = this.created_at.getMonth()+1;
    var date = this.created_at.getDate();
    var hour = this.created_at.getHours();
    var min = this.created_at.getMinutes();
    return (year + '-' + month + '-' + date + ' ' + hour + ':' + min);
}
blogTypeSchema.methods.getUpdateDate = function () {
    var year = this.updated_at.getFullYear();
    var month = this.updated_at.getMonth()+1;
    var date = this.updated_at.getDate();
    var hour = this.updated_at.getHours();
    var min = this.updated_at.getMinutes();
    return (year + '-' + month + '-' + date + ' ' + hour + ':' + min);
}

var BlogTypeSchema = mongoDB.model('blog_type', blogTypeSchema);



//blog表模型
var blogSchema = new Schema({
    title: {
        type: String
    },
    type: {
        type: Schema.Types.ObjectId,
        ref:'blog_type'
    },
    description: String,
    content: String,
    view_times: {
        type: Number,
        default: 0
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

//格式化时间
blogSchema.methods.getCreateDate = function () {
    var year = this.created_at.getFullYear();
    var month = this.created_at.getMonth()+1;
    var date = this.created_at.getDate();
    var hour = this.created_at.getHours();
    var min = this.created_at.getMinutes();
    return (year + '-' + month + '-' + date + ' ' + hour + ':' + min);
}
blogSchema.methods.getUpdateDate = function () {
    var year = this.updated_at.getFullYear();
    var month = this.updated_at.getMonth()+1;
    var date = this.updated_at.getDate();
    var hour = this.updated_at.getHours();
    var min = this.updated_at.getMinutes();
    return (year + '-' + month + '-' + date + ' ' + hour + ':' + min);
}

var BlogSchema = mongoDB.model('blog', blogSchema);



module.exports = {
    BlogTypeSchema: BlogTypeSchema,
    BlogSchema: BlogSchema
}