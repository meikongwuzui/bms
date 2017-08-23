var http=require('https');  

function Jssdk(){
    this.getaccess_token=function(){
        //get 请求外网  
        http.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxa4e7517fe99f820e&secret=513a774504039197f29fcf486ddb32c5'
        ,function(req,res){  
            req.on('data',function(data){  
                console.log(data);
            });  
            req.on('end',function(){  
            });  
        });  
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