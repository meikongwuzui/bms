var express=require("express");
var routes=require('./routes/index');
var WinXin=require('./routes/weixin');

var app=express();
app.set('views','views');
app.set('view engine','jade');

app.use(express.static('public'));

app.use('/',routes);

Weixin.initMsg();