var mysql=require('mysql');


function SQLHelper(){
    this.query=function(sqlstr){
        var resdata;

        var connection=mysql.createConnection({
            host:'rm-wz98803n5662x8c24o.mysql.rds.aliyuncs.com',
            port:'3306',
            user:'root',
            password:'qq-999999',
            database:'bms'
        });
        
        connection.connect(function(err){
            if(err){
                console.log('[connection conn]-'+err);
                return;
            }
            console.log('[connection conn] succeed!');
        });
        
        connection.query(sqlstr,function(err,result){
            if(err){
                console.log('[query]-'+err);
                return;
            }
            console.log('result:'+result);
            resdata=result;
        });
        
        connection.end(function(err){
            if(err){
                console.log('[connection end]-'+err);
                return;
            }
            console.log('[connection end] succeed!');
        })

        console.log(resdata);
        return resdata;
    }
}

module.exports=new SQLHelper();