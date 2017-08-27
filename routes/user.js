var express = require('express');
var user = require('../sql/user');
var u_weixin=require('../sql/u-weixin');

var router = express.Router();

router.get('/admin/login',function(req,res){
    res.render('../views/admin/login');
});
router.get('/admin/index',function(req,res){
    res.render('../views/admin/index');
});

router.post('/admin/login', function (req, res) {
    var loginfo = req.body;
    user.login(loginfo, function (resul) {
        if (resul) {
            if (resul.length > 0) {
                res.send('{"status":true,"data":' + JSON.stringify(resul[0]) + '}');
            }
            else {
                res.send('{"status":false,"msg":"账号或者密码错误"}');
            }
        }
    });
});
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