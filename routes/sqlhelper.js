var mysql=require('mysql');


function SQLHelper(){
    this.query=function(sqlstr){
        var connection=mysql.createConnection({
            host:'---rm-wz98803n5662x8c24.mysql.rds.aliyuncs.com',
            port:'3306',
            user:'root',
            password:'qq-999999'
        });
        
        connection.connect(function(err){
            if(err){
                console.log('[query]-'+err);
                return;
            }
            console.log('[connection conn] succeed!');
        });
        
        connection.query(sqlstr,function(err,rows,fields){
            if(err){
                console.log('[query]-'+err);
                return;
            }
            console.log('this solution is:',rows[0].solution);
        });
        
        connection.end(function(err){
            if(err){
                return;
            }
            console.log('[connection end] succeed!');
        })
    }
}

module.exports=new SQLHelper();