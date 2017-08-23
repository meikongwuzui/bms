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
            callback(result);
        });
    }
    this.detail=function(pkid,callback){
        sqlhelper.query('SELECT\
        b_booktype.pkid,\
        b_booktype.fkparentid,\
        b_booktype.`name`,\
        b_booktype.layer,\
        b_booktype.sort,\
        b_booktype.`status`\
        FROM\
        b_booktype\
        WHERE `pkid` = ' + pkid,
        function(result){
            callback(result);
        });
    }
}

module.exports=new b_booktype();