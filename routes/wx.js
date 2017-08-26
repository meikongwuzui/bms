var express = require('express');
var weixinApi=require('weixin-api');
var jssdk=require('./jssdk');
var weixin=require('./weixin');
var u_weixin=require('../sql/u-weixin');

var router = express.Router();

//微信获取网页jssticket
router.get('/api/weixin/getjsticket',function(req,res){
    jssdk.getaccess_token(function(result){
        jssdk.getjsapi_ticket(JSON.parse(result).access_token,function(data){
            res.status(200).send(data);
        });
    });
})
router.get('/api/weixin/author/login',function(req,res){//从这里去请求网页授权，统一入口
    var resurl = req.protocol +'://'+ req.hostname+'/api/weixin/oauth/gotcode';
    var url = jssdk.getAuthorizeURL(resurl);
    res.redirect(url);
})
router.get('/api/weixin/oauth/gotcode',function(req,res){//
    console.log(req.baseUrl);
    var code=req.query.code;
    jssdk.getauthoraccesstoken(code,function(resul){
        var acctokeninfo=JSON.parse(resul);
        var acctoken=acctokeninfo.access_token;
        var openid=acctokeninfo.openid;
        jssdk.getuserinfo(acctoken,openid,function(userinfo){//微信返回code，函数内继续处理，返回用户信息
            var u_userinfo=JSON.parse(userinfo);
            u_weixin.isexist(openid,function(exist){
                if(exist){
                    res.redirect('http://www.coolwan.cc/user/index?openid='+ openid);
                }
                else{
                    u_weixin.insert(u_userinfo,function(){
                        res.redirect('http://www.coolwan.cc/user/index?openid='+ openid);
                    })
                }
            });
            
        })
    })
});

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
    console.log('req'+req);
    weixinApi.loop(req,res);
});



module.exports = router;