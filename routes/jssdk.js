var http = require('https');
var querystring = require('querystring');

function Jssdk() {
    this.getaccess_token = function (callback) {
        //get 请求外网  
        var url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxa4e7517fe99f820e&secret=513a774504039197f29fcf486ddb32c5';
        http.get(url, function (res) {
            var datas = [];
            var size = 0;
            res.on('data', function (data) {
                datas.push(data);
                size += data.length;
                //process.stdout.write(data);  
            });
            res.on("end", function () {
                var buff = Buffer.concat(datas, size);
                // var result = iconv.decode(buff, "utf8");//转码
                var result = buff.toString();//不需要转编码,直接tostring  
                callback(result);
            });
        }).on("error", function (err) {
            Logger.error(err.stack)
            callback.apply(null);
        });
    },
    this.getjsapi_ticket = function (access_token, callback) {
        //get 请求外网  
        var url = "https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=" + access_token + "&type=jsapi";

        http.get(url, function (res) {
            var datas = [];
            var size = 0;
            res.on('data', function (data) {
                datas.push(data);
                size += data.length;
                //process.stdout.write(data);  
            });
            res.on("end", function () {
                var buff = Buffer.concat(datas, size);
                // var result = iconv.decode(buff, "utf8");//转码
                var result = buff.toString();//不需要转编码,直接tostring 
                callback(result);
            });
        }).on("error", function (err) {
            Logger.error(err.stack)
            callback.apply(null);
        });
    },
    this.getAuthorizeURL = function (redirect, state, scope) {
        var url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
        var info = {
            appid: 'wxa4e7517fe99f820e',
            redirect_uri: redirect,
            response_type: 'code',
            scope: scope || 'snsapi_userinfo',
            state: state || ''
        };
        return url + '?' + querystring.stringify(info) + '#wechat_redirect';
    },
    this.getauthoraccesstoken=function(code,callback){
       var url =  'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxa4e7517fe99f820e&secret=513a774504039197f29fcf486ddb32c5&code='
       +code
       +'&grant_type=authorization_code';

       http.get(url, function (res) {
            var datas = [];
            var size = 0;
            res.on('data', function (data) {
                datas.push(data);
                size += data.length;
                //process.stdout.write(data);  
            });
            res.on("end", function () {
                var buff = Buffer.concat(datas, size);
                // var result = iconv.decode(buff, "utf8");//转码
                var result = buff.toString();//不需要转编码,直接tostring 
                callback(result);
            });
        }).on("error", function (err) {
            Logger.error(err.stack)
            callback.apply(null);
        });
    },
    this.getuserinfo=function(accetoken,openid,callback){
        var url =  'https://api.weixin.qq.com/sns/userinfo?access_token='+accetoken+'&openid='+openid+'&lang=zh_CN';
 
        http.get(url, function (res) {
             var datas = [];
             var size = 0;
             res.on('data', function (data) {
                 datas.push(data);
                 size += data.length;
                 //process.stdout.write(data);  
             });
             res.on("end", function () {
                 var buff = Buffer.concat(datas, size);
                 // var result = iconv.decode(buff, "utf8");//转码
                 var result = buff.toString();//不需要转编码,直接tostring 

                //得到了用户信息
                var userinfo=JSON.parse(result);

                 callback(result);
             });
         }).on("error", function (err) {
             Logger.error(err.stack)
             callback.apply(null);
         });
     }
}

module.exports = new Jssdk();