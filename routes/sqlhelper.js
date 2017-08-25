var mysql=require('mysql');

function SQLHelper(){
    this.query=function(sqlstr,callback){
        
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
        });
        
        connection.query(sqlstr,function(err,result){
            if(err){
                console.log('[query]-'+err);
                return;
            }
            callback(result);
        });
        
        connection.end(function(err){
            if(err){
                console.log('[connection end]-'+err);
                return;
            }
        })
    },
    this.querywithpara=function(sqlstr,para,callback){
        
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
        });
        
        connection.query(sqlstr,para,function(err,result){
            if(err){
                console.log('[query]-'+err);
                return;
            }
            callback(result);
        });
        
        connection.end(function(err){
            if(err){
                console.log('[connection end]-'+err);
                return;
            }
        })
    }
}

module.exports=new SQLHelper();