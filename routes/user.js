var express = require('express');
var user = require('../sql/user');

var router = express.Router();

router.post('/admin/login', function (req, res) {
    var loginfo = req.body;
    user.login(loginfo, function (resul) {
        if (resul) {
            if (resul.length > 0) {
                res.send('{"status":true,"data":' + resul[0] + '}');
            }
            else {
                res.send('{"status":false,"msg":"账号或者密码错误"}');
            }
        }
    });
});

module.exports = router;