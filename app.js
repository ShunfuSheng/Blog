var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

//引入art-template模板引擎
var template = require('art-template');
template.config('base', '');
template.config('extname', '.html');
app.engine('.html', template.__express);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//导入子模块
app.use('/users', require('./routes/users'));
app.use('/api/v1/blog_type', require('./routes/blog/blog_type'));
app.use('/api/v1/blog', require('./routes/blog/blog'));



//获取blog的表数据
app.get('/api/v1/blogs/get_data', (req, res) =>{
  // BlogTypeSchema.find({})
  //     .then(data =>{
  //       //对输出数据进行格式化
  //       var dataArr = data.map(item =>{
  //         var k = item.toObject();
  //         k.id = item.id;
  //         delete k._id;
  //         delete k._v;
  //         k.updated_at =
  //       })
  //     })
})

//获取集合分类的表数据
app.get('/api/v1/blog_type/get_data', (req, res) =>{
  BlogTypeSchema.find({})
      .then(data=>{
        res.json({
          status: '200',
          data: data
        })
      })
})






// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
