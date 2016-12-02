/**
 * Created by Administrator on 2016/11/18.
 */

var express = require('express');
var router = express.Router();
//引入数据model
var model = require('../../model');
var BlogSchema = model.BlogSchema;
var BlogTypeSchema = model.BlogTypeSchema


//显示博客列表
router.get('/', function (req, res) {
    //通过关联blog_type表获取相应的数据
    BlogSchema.find({}).populate('type').then(function (data) {
        // console.log(data);
        res.render('blog/list', {blogData: data});
    }).catch(function (err) {
        console.log(err);
    })
});

//博客详情展示
router.get('/show', function (req, res) {
    BlogSchema.findById(req.query.id).then(function (data) {
        if(data){
            res.render('blog/show', {blog: data});
        }
    }).catch(function (err) {
        console.dir(err);
    })
})

//添加一条博客
router.get('/add', function (req, res) {
    //传递(id + name)，设置type值为blog_type中的id
    BlogTypeSchema.find({}).select('name').then(function (data) {
        var blog = new BlogSchema();
        res.render('blog/add', {blog: blog, blogType: data});
    }).catch(function (err) {
        console.log(err);
    })
});

router.post('/add/:blog_id?', function (req, res) {
    var data = req.body;
    data._id = req.params.blog_id;
    //存储数据库
    var blog = new BlogSchema(data);
    blog.save();
    res.json({status: '200', msg: '添加成功!'});
});

//编辑一条博客
router.get('/editor', function (req, res) {
    var id = req.query.id;
    BlogSchema.findById(id).then(function (data) {
        if(data){
            BlogTypeSchema.find({}).select('name').then(function (typeData) {
                res.render('blog/editor', {blog: data, blogType: typeData});
            }).catch(function (err) {
                console.dir(err);
            })
        }
    }).catch(function (err) {
        console.dir(err);
    })
})

router.post('/editor/:id?', function (req, res) {
    var id = req.params.id;
    var data = req.body;
    data.updated_at = Date.now();
    BlogSchema.findOneAndUpdate({_id: id}, data).then(function (data) {
        if(data){
            res.json({status: '200', msg: '修改成功，准备跳转!'});
        }else{
            res.json({status: '400', msg: '修改失败，请联系管理员!'});
        }
    }).catch(function (err) {
        console.dir(err);
    })
})

//删除一条博客
router.get('/delete', function (req, res) {
    var id = req.query.id;
    BlogSchema.findByIdAndRemove(id).then(function () {
        res.json({status: '200', msg: '删除成功!'});
    }).catch(function (err) {
        console.dir(err);
    })
});

//写一个api接口，获取blog表中的数据，供远程调用
router.get('/get_data', (req, res) =>{
    BlogSchema.find({type: req.query.id})
        .then(data =>{
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
        }).catch(function (err) {
        console.dir(err);
    })
})





module.exports = router;
