var sqlhelper=require('../sqlhelper');

function b_book(){
    this.getlist=function(typeid,callback){
        sqlhelper.query('SELECT\
        b_book.pkid,\
        b_book.`name`,\
        b_book.author,\
        b_book.edition,\
        b_book.contentintroduction,\
        b_book.bookcover,\
        b_booktype.`name` AS typename\
        FROM\
        b_book\
        RIGHT OUTER JOIN b_type_book_ref ON b_book.pkid=b_type_book_ref.fkbookid\
        RIGHT OUTER JOIN b_booktype ON b_type_book_ref.fkbooktypeid=b_booktype.pkid\
        WHERE b_booktype.pkid= '+typeid,
        function(result){
            console.log("booktype result:"+result);
            callback(result);
        });
    },
    this.insert=function(bookinfo,callback){
        var para=[];
        sqlhelper.query("insert into `b_book`(`name`,`sub_name`,`isbn`,`author`,`press`,`publicationdate`,`instoragedate`,`edition`,`bookcover`,`pagecount`,`wordcount`,`onstroge`,`status`,`point`,`plandate`,`recommend`,`contentintroduction`,`authorintroduction`,`catelogue`,`goodcomment`,`goodhighlight`)"+
        "values('好书4',null,'','',null,null,null,null,'https://img3.doubanio.com/lpic/s11311564.jpg',null,null,'0',null,null,null,'','jianjie',null,null,null,null)",
        para,
        function(result){
            console.log("addbook result:"+result);
            callback(result);
        });
    }
}

module.exports=new b_book();