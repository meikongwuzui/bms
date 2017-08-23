var http=require('https');  

function Jssdk(){
    this.getaccess_token=function(){
        //get 请求外网  
        var options = { 
            hostname: 'https://api.weixin.qq.com', 
            port: 80, 
            path: '/cgi-bin/token?grant_type=client_credential&appid=wxa4e7517fe99f820e&secret=513a774504039197f29fcf486ddb32c5', 
            method: 'GET' 
        }; 
           
        var req = http.request(options, function (res) { 
            console.log('STATUS: ' + res.statusCode); 
            console.log('HEADERS: ' + JSON.stringify(res.headers)); 
            res.setEncoding('utf8'); 
            res.on('data', function (chunk) { 
                console.log('BODY: ' + chunk); 
            }); 
        }); 
           
        req.on('error', function (e) { 
            console.log('problem with request: ' + e.message); 
        }); 
           
        req.end();
    },
    this.getjsapi_ticket=function(){
        //get 请求外网  
        http.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxa4e7517fe99f820e&secret=513a774504039197f29fcf486ddb32c5'
        ,function(req,res){  
            req.on('data',function(data){  
                 
            });  
            req.on('end',function(){  
            });  
        });  
    }
}

module.exports=new Jssdk();