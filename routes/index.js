var express=require('express');
var router=express.Router();
var weixinApi=require('weixin-api');
var path=require('path');
var jssdk=require('./jssdk');

//无目录显示主页
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'../public/home.html'));
});

//图书类型
router.all('/booktype/*',require('./book'));
//图书
router.all('/book/*',require('./book'));
//用户
router.all('/admin/*',require('./user'));
//微信消息接口 get
router.get('/api',function(req,res){
    if(weixinApi.checkSignature(req)){
        res.status(200).send(req.query.echostr);
    }
    else{
        res.status(200).send('fail');
    }
});
//微信接口消息 post
router.post('/api',function(req,res){
    weixinApi.loop(req,res);
});
//微信获取网页jssticket
router.get('/weixin/getjsticket',function(req,res){
    jssdk.getaccess_token(function(result){
        jssdk.getjsapi_ticket(JSON.parse(result).access_token,function(data){
            res.status(200).send(data);
        });
    });
})

module.exports=router;