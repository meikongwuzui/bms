var express=require("express");
var routes=require('./routes/index');
var WeiXin=require('./routes/weixin');
var booktype=require('./routes/sql/booktype');
var book=require('./routes/sql/book');
var bodyParser = require('body-parser');

var app=express();
app.set('views','views');
app.set('view engine','jade');

app.use(express.static('public'));

app.use(bodyParser.json({limit: '1mb'}));  //这里指定参数使用 json 格式
app.use(bodyParser.urlencoded({
  extended: true
}));
app.post('/book/add',function(req,res){
    var bookinfo=req.body;
    book.isexist(bookinfo,function(resul){
        if(resul){
            res.send('{"status":false,"msg":"book is exist"');
        }else{
            book.insert(bookinfo,function(result){
                res.send(result);
            });
        }
    });
});

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