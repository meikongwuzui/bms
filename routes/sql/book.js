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
    this.insert=function(bio,callback){
        var para=[bio.name,bio.sub_name,bio.isbn,bio.author,bio.press,bio.publicationdate,bio.instoragedate,bio.edition,bio.bookcover,bio.pagecount,bio.wordcount,bio.onstroge,bio.status,bio.point,bio.plandate,bio.recommend,bio.contentintroduction,bio.authorintroduction,bio.catelogue,bio.goodcomment,bio.goodhighlight];
        sqlhelper.querywithpara("insert into `b_book`(`name`,`sub_name`,`isbn`,`author`,`press`,`publicationdate`,`instoragedate`,`edition`,`bookcover`,`pagecount`,`wordcount`,`onstroge`,`status`,`point`,`plandate`,`recommend`,`contentintroduction`,`authorintroduction`,`catelogue`,`goodcomment`,`goodhighlight`)"+
        "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        para,
        function(result){
            console.log("addbook result:"+result);
            callback(result);
        });
    },
    this.isexist=function(bio,callback){
        var para=[bio.isbn];
        sqlhelper.querywithpara("SELECT COUNT(*) FROM `b_book` WHERE `isbn` = ? ;  ",
        para,
        function(result){
            callback(result>0);
        });
    }
}

module.exports=new b_book();