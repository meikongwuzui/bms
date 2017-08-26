var express=require('express');
var path=require('path');

var router=express.Router();

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
//微信
router.all('/api/*',require('./wx'));

module.exports=router;