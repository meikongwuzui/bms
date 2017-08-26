var sqlhelper=require('../routes/sqlhelper');

function u_weixin(){
    this.isexist=function(openid,callback){
        sqlhelper.query("SELECT COUNT(*) as count FROM `u_weixin` WHERE `openid`= '"+openid+"' ; ",
        function(result){
            callback(result[0].count>0);
        });
    },
    this.detail=function(openid,callback){
        sqlhelper.query("SELECT * FROM `u_weixin` WHERE `openid`= '"+openid+"' ; ",
        function(result){
            callback(result[0]);
        });
    },
    this.insert=function(weixin,callback){
        console.log('add openid:'+weixin.openid);
        console.log('add :'+ JSON.stringify(weixin));
        var para=[0,weixin.openid,weixin.nickname,weixin.sex,weixin.province,weixin.city,weixin.country,weixin.headimgurl,'privilege','unionid'];
        sqlhelper.querywithpara("insert into `u_weixin`(`fkuserid`,`openid`,`nickname`,`sex`,`province`,`city`,`country`,`headimgurl`,`privilege`,`unionid`)values(?,?,?,?,?,?,?,?,?,?)",
        para,
        function(result){
            callback(result);
        });
    }
}

module.exports=new u_weixin();