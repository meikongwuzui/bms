var express = require('express');
var weixinApi=require('weixin-api');
var jssdk=require('./jssdk');

var router = express.Router();

//微信获取网页jssticket
router.get('/api/weixin/getjsticket',function(req,res){
    jssdk.getaccess_token(function(result){
        jssdk.getjsapi_ticket(JSON.parse(result).access_token,function(data){
            res.status(200).send(data);
        });
    });
})
router.get('/api/weixin/author/login',function(req,res){
    console.log(req.protocol +'//'+ req.host);
    res.status(200).send('ok');
    // jssdk.getcode('')
})
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



module.exports = router;