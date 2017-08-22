var sqlhelper=require('../sqlhelper');

function b_booktype(){
    this.getlist=function(){
    //    var result= sqlhelper.query('SELECT\
    //     b_booktype.pkid,\
    //     b_booktype.fkparentid,\
    //     b_booktype.`name`,\
    //     b_booktype.layer,\
    //     b_booktype.sort,\
    //     b_booktype.`status`\
    //     FROM\
    //     b_booktype\
    //     ')
    //     return result;
    var result= sqlhelper.query('SELECT 1+1 as solution    ')
    console.log(result);
    return result;
    }
}

module.exports=new b_booktype();