var sqlhelper=require('./sqlhelper');

function user(){
    this.login=function(loginfo,callback){
        var para=[loginfo.username,loginfo.userpwd];
        sqlhelper.querywithpara("SELECT * FROM u_user WHERE  account = ? AND pwd = ? ",
        para,
        function(result){
            callback(result);
        });
    }
}

module.exports=new user();