var express = require('express');
var user = require('../sql/user');
var u_weixin=require('../sql/u-weixin');

var router = express.Router();

router.get('/admin/login',function(req,res){
    res.render('../views/admin/login');
});
router.get('/admin/index',function(req,res){
    res.render('../views/admin/index',{datatype:'index'});
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
router.get('/admin/booklist', function (req, res) {
    res.render('../views/admin/booklist',{datatype:'widgets'});
});

module.exports = router;