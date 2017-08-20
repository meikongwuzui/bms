var express=require("express");
var app=express();

app.use(express.static('public'));

app.get('/',function(req,res){
    res.send('hello world!');
});

var server=app.listen(80,function(){
    var host=server.address().address;
    var port=server.address().port;
    console.log('example app listing at http://%s:%s', host, port);
})