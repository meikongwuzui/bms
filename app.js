var express=require("express");
var bodyParser = require('body-parser');
var WeiXin=require('./routes/weixin');
var routes=require('./routes/index');
var booktype=require('./routes/sql/booktype');

var app=express();

//设置模板引擎
app.set('views','views');
app.set('view engine','jade');
//设置静态页面
app.use(express.static('public'));
//设置post
app.use(bodyParser.json({limit: '1mb'}));  //这里指定参数使用 json 格式
app.use(bodyParser.urlencoded({
  extended: true
}));

//微信设置
WeiXin.initMsg();
WeiXin.responseMsg();

//接管所有路由
app.use('/',routes);

//加载缓存图书类别
booktype.getlist(function(result){
    app.locals.booktypelist=result;
})

//启动服务器
var server=app.listen(80,function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log('example app listing at http://%s:%s', host, port);
})