var express=require('express');
var user=require('../sql/user');

var router=express.Router();

 router.post('/admin/login',function(req,res){
    var loginfo=req.body;
    user.login(loginfo,function(resul){
        if(resul){
            res.send(resul);
        }
    });
});

module.exports=router;