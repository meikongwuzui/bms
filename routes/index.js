var express=require('express');
var router=express.Router();
var weixinApi=require('weixin-api');
var path=require('path');
var booktype=require('./sql/booktype');
var book=require('./sql/book');
var jssdk=require('./jssdk');

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

router.get('/book/list',function(req,res){
    if(req.query.t){
        book.getlist(req.query.t,function(result){
            res.render('../views/book/list',{booklist:result});
        });
    }
    else{
        res.status(200).send('无效的图书类别');
    }
})

router.get('/book/detail',function(req,res){
    if(req.query.b){
        // book.getlist(req.query.b,function(result){
            res.render('../views/book/detail');
        // });
    }
    else{
        res.status(200).send('无效的图书');
    }
})

router.get('/weixin/getaccess_token',function(req,res){
    jssdk.getaccess_token(function(result){
        jssdk.getjsapi_ticket(JSON.parse(result).access_token,function(data){
            res.status(200).send(data);
        });
    });
})

module.exports=router;