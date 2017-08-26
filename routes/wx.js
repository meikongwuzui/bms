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
    var resurl = req.protocol +'://'+ req.host+'/api/weixin/author/gotcode';
    var url = jssdk.getAuthorizeURL(resurl);
    res.redirect(url);
})
router.get('/api/weixin/author/gotcode',function(req,res){
    console.log(req.baseUrl);
    var code=req.query.code;
    jssdk.getauthoraccesstoken(code,function(resul){
        console.log(resul);
        res.status(200).send('ok');
    })
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