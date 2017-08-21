var weixinApi=require('weixin-api');

function WeiXin(){
    this.initMsg=function(){
        weixinApi.token='';
    }
}

module.exports=new WeiXin();