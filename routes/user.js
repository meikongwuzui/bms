var express = require('express');
var user = require('../sql/user');
var u_weixin=require('../sql/u-weixin');

var router = express.Router();

router.get('/user/index',function(req,res){
    if(req.query.openid){
        u_weixin.detail(req.query.openid,function(userinfo){
            res.render('../views/user/index',{user: userinfo},function(err,html){
                res.status(200).send(html);
            });
        })
        
    }else{
        res.send('erro openid');
    }
});

module.exports = router;