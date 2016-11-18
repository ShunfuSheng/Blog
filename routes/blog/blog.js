/**
 * Created by Administrator on 2016/11/18.
 */

var express = require('express');
var router = express.Router();
//引入数据model
var db = require('../../db');
var BlogSchema = db.BlogSchema;


//处理请求
router.get('/', function (req, res) {
    res.render('blog/list');
});





module.exports = router;
