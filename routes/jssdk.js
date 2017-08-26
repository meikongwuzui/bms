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
    this.getcode = function (responseurl) {//用户授权获取网页授权--获取code
        // var url='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appid+'&redirect_uri='+
        // +'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        var url = this.getAuthorizeURL(responseurl);
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
    }
}

module.exports = new Jssdk();