/**
 * Created by Administrator on 2016/11/18.
 */

var express = require('express');
var router = express.Router();
//引入数据model
var model = require('../../model');
var BlogTypeSchema = model.BlogTypeSchema;


//博客类型展示
router.get('/', (req, res) =>{
    BlogTypeSchema.find().then((data) =>{
        res.render('blog_type/type_list', {blogTypeData: data});
    })
});

//博客类型添加
router.get('/add', (req, res) =>{
    var blogType = new BlogTypeSchema();
    res.render('blog_type/type_add', {blog: blogType});
});

router.post('/add', function (req, res) {
    BlogTypeSchema.findByIdAndUpdate(req.body._id, req.body, {upsert: true})
        .then((data) =>{
            if(data){
                res.json({status: '400', msg: '添加失败，请联系管理员!'});
            }else{
                res.json({status: '200', msg: '添加成功，准备跳转...'});
            }
        }).catch((err) =>{
        console.dir(err);
    })
});

//博客类型修改
router.get('/editor', function (req, res) {
    //id中转站
    var id = req.query.id;
    BlogTypeSchema.findById(id).then(function (data) {
        res.render('blog_type/editor', {blog_type_data: data})
    }).catch(function (err) {
        console.dir(err);
    })
});

router.post('/editor', function (req, res) {
    var updateData = req.body;
    updateData.updated_at = Date.now();
    BlogTypeSchema.findByIdAndUpdate(updateData._id, updateData).then(function (data) {
        if(data){
            res.redirect('/api/v1/blog_type/');
        }
    }).catch(function (err) {
        console.dir(err);
    })
});

//写一个api接口，获取集合分类的表数据，供远程调用
router.get('/get_data', (req, res) =>{
    BlogTypeSchema.find({})
        .then(data=>{
            //解掉同源协议，允许跨域访问此接口
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
            res.header("X-Powered-By",' 3.2.1');
            res.header("Content-Type", "application/json;charset=utf-8");
            res.json({
                status: '200',
                data: data
            })
        })
})




module.exports = router;
