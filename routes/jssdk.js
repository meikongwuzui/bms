var http=require('https');  

function Jssdk(){
    this.getaccess_token=function(callback){
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
    this.getjsapi_ticket=function(access_token,callback){
        //get 请求外网  
        var url="https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token="+access_token+"&type=jsapi";

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
    }
}

module.exports=new Jssdk();