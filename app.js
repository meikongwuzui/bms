var express=require("express");
var routes=require('./routes/index');
var WeiXin=require('./routes/weixin');
var sqlhelper=require('./routes/sqlhelper');

var app=express();
app.set('views','views');
app.set('view engine','jade');

app.use(express.static('public'));

app.use('/',routes);

WeiXin.initMsg();
WeiXin.responseMsg();

var server=app.listen(80,function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log('example app listing at http://%s:%s', host, port);

    sqlhelper.query("select 1+1 as solution");
})