var express=require('express');
var router=express.Router();
var weixinApi=require('weixin-api');

router.get('/',function(req,res){
    if(weixinApi.checkSignature(req)){
        res.status(200).send(req.query.echostr);
    }
    else{
        res.status(200).send('fail');
    }
});

router.post('/',function(req,res){
    weixinApi.loop(req,res);
});

module.exports=router;