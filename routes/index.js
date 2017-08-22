var express=require('express');
var router=express.Router();
var weixinApi=require('weixin-api');
var path=require('path');
var booktype=require('./sql/booktype');

router.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'../public/home.html'));
});

router.get('/api',function(req,res){
    if(weixinApi.checkSignature(req)){
        res.status(200).send(req.query.echostr);
    }
    else{
        res.status(200).send('fail');
    }
});

router.post('/api',function(req,res){
    weixinApi.loop(req,res);
});

router.get('/booktype/getlist',function(req,res){
   booktype.getlist(function(result){
    res.status(200).send(result);
   });
})

module.exports=router;