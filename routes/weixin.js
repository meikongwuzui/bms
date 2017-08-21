var weixinApi=require('weixin-api');

function WeiXin(){
    this.initMsg=function(){
        weixinApi.token='bms';
    }

    this.responseMsg=function(){
        resTextMsg();
    }
}

function resTextMsg(){
    weixinApi.textMsg(function(msg){
        var content="消息内容:"+msg.content+"\n";
        content=content+"toUserName:"+msg.toUserName+"\n";
        content=content+"fromUserName:"+msg.fromUserName+"\n";
        var resMsg={};
        resMsg={
            fromUserName:msg.toUserName,
            toUserName:msg.fromUserName,
            msgType:"text",
            content:content,
            funcFlag:0
        };
        weixinApi.sendMsg(resMsg);
    });

    // 监听事件消息
    weixin.eventMsg(function(msg) {
        console.log("eventMsg received");
        console.log(JSON.stringify(msg));
        var content="消息内容:"+msg.content+"\n";
        content=content+"toUserName:"+msg.toUserName+"\n";
        content=content+"fromUserName:"+msg.fromUserName+"\n";
        
        var resMsg={};
        resMsg={
            fromUserName:msg.toUserName,
            toUserName:msg.fromUserName,
            msgType:"event",
            content:content,
            funcFlag:0
        };
        weixinApi.sendMsg(resMsg);
    });
}

module.exports=new WeiXin();