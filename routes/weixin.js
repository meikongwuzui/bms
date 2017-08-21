var weixinApi=require('weixin-api');

function WeiXin(){
    this.initMsg=function(){
        weixinApi.token='bms';
    }
}

module.exports=new WeiXin();