var express=require("express");
var routes=require('./routes/index');
var WeiXin=require('./routes/weixin');
var booktype=require('./routes/sql/booktype');

var app=express();
app.set('views','views');
app.set('view engine','jade');

app.use(express.static('public'));

app.use('/',routes);

WeiXin.initMsg();
WeiXin.responseMsg();

booktype.getlist(function(result){
    app.locals.booktypelist=result;
})


var server=app.listen(80,function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log('example app listing at http://%s:%s', host, port);
})