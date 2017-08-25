var sqlhelper=require('../sqlhelper');

function b_booktype(){
    this.getlist=function(callback){
        sqlhelper.query('SELECT\
        b_booktype.pkid,\
        b_booktype.fkparentid,\
        b_booktype.`name`,\
        b_booktype.layer,\
        b_booktype.sort,\
        b_booktype.`status`,\
        COUNT(b.fkbookid) count\
    FROM\
        b_booktype\
    LEFT JOIN b_type_book_ref b ON b_booktype.pkid = b.fkbooktypeid\
    WHERE\
        b_booktype.`status` = 0\
    GROUP BY\
        b_booktype.pkid,\
        b_booktype.fkparentid,\
        b_booktype.`name`,\
        b_booktype.layer,\
        b_booktype.sort,\
        b_booktype.`status`',
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