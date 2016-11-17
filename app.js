var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//引入数据model
var db = require('./db');
var BlogTypeSchema = db.BlogTypeSchema;

//引入子模块
var users = require('./routes/users');

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

app.use('/users', users);


app.get('/', (req, res) => {
  BlogTypeSchema.find().then((data) => {
    res.render('type_list', {blogTypeData: data});
  })
});

app.get('/add', (req, res) => {
  var blogType = new BlogTypeSchema();
  res.render('type_add', {blog: blogType});
});

app.post('/add', function (req, res) {
  BlogTypeSchema.findById(req.body.id).then((data) => {
    if(data){
      res.json({status: '400', msg: '用户已存在!'});
    }else{
      BlogTypeSchema.findByIdAndUpdate(req.body.id, {name: req.body.name, description: req.body.description}, {upsert: true})
          .then((data) => {
            if(data){
              res.json({status: '400', msg: '注册失败，请联系管理员!'});
            }else{
              res.json({status: '200', msg: '注册成功，准备跳转...'});
            }
          }).catch((err) => {
            console.dir(err);
      })
    }
  }).catch((err) => {
    console.dir(err);
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
