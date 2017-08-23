var sqlhelper=require('../sqlhelper');

function b_booktype(){
    this.getlist=function(callback){
        sqlhelper.query('SELECT\
        b_booktype.pkid,\
        b_booktype.fkparentid,\
        b_booktype.`name`,\
        b_booktype.layer,\
        b_booktype.sort,\
        b_booktype.`status`\
        FROM\
        b_booktype\
        WHERE `status` =0',
        function(result){
            console.log("booktype result:"+result);
            callback(result);
        });
    }
}

module.exports=new b_booktype();