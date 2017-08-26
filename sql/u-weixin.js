var sqlhelper=require('../routes/sqlhelper');

function u_weixin(){
    this.isexist=function(openid,callback){
        var para=[openid];
        sqlhelper.querywithpara("SELECT COUNT(*) as count FROM u_weixin WHERE openid=?",
        para,
        function(result){
            callback(result[0].count>0);
        });
    },
    this.detail=function(openid,callback){
        var para=[openid];
        sqlhelper.querywithpara("SELECT * FROM u_weixin WHERE openid=?",
        para,
        function(result){
            callback(result[0]);
        });
    },
    this.insert=function(weixin,callback){
        var para=[weixin.fkuserid,weixin.openid,weixin.nickname,weixin.sex,weixin.province,weixin.city
            ,weixin.country,weixin.headimgurl,weixin.privilege,weixin.unionid];
        sqlhelper.querywithpara("INSERT INTO u_weixin(fkuserid,openid,nickname,sex,province,city,"+
            "country,headimgurl,privilege,unionid)values(?,?,?,?,?,?,?,?,?,?)",
        para,
        function(result){
            callback(result);
        });
    }
}

module.exports=new u_weixin();