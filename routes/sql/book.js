var sqlhelper=require('../sqlhelper');

function b_book(){
    this.getallbook=function(callback){
        sqlhelper.query('SELECT  b_book.pkid,\
        b_book.`name`,\
        b_book.author,\
        b_book.edition,\
        b_book.contentintroduction,\
        b_book.bookcover,\
        b_booktype.`name` AS typename\
        FROM\
        b_book\
        LEFT JOIN b_type_book_ref ON b_book.pkid=b_type_book_ref.fkbookid\
        LEFT JOIN b_booktype ON b_type_book_ref.fkbooktypeid=b_booktype.pkid',
        function(result){
            callback(result);
        });
    },
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
            callback(result);
        });
    },
    this.pagelist=function(pagemodel,wheremodel,callback){
        var currentpage = pagemodel.currentpage;
        var pagesize = pagemodel.pagesize;
        var orderby = pagemodel.orderby;
        var ordertype = pagemodel.ordertype;

        var strwhere;
        if(wheremodel.fkbooktypeid>0){
            strwhere = strwhere + " AND b_type_book_ref.fkbooktypeid=" + wheremodel.keyword;
         }
         if(wheremodel.keyword){
            strwhere = strwhere + " AND b_book.`name` LIKE '%" + wheremodel.keyword + "%' ";
         }

        var str="SELECT\
        b_book.pkid,\
        b_book.`name`,\
        b_book.author,\
        b_book.bookcover,\
        b_book.edition,\
        b_book.contentintroduction,\
        b_book.bookcover,\
        b_booktype.`name` AS typename\
        FROM\
        b_book\
        LEFT OUTER JOIN b_type_book_ref ON b_book.`pkid`=b_type_book_ref.`fkbookid` \
        LEFT OUTER JOIN b_booktype ON b_type_book_ref.`fkbooktypeid`=b_booktype.`pkid` \
        WHERE 1=1 "
        // if(typeof(strwhere)!=undefined){
        //     str = str + strwhere;  
        // }      
        str = str + " ORDER BY pkid desc  LIMIT "+ currentpage * pagesize +"," + pagesize + " ; ";


        //总数
        str= str +"\
        \
        SELECT COUNT(*) FROM b_book \
        LEFT OUTER JOIN b_type_book_ref ON b_book.`pkid`=b_type_book_ref.`fkbookid` \
        LEFT OUTER JOIN b_booktype ON b_type_book_ref.`fkbooktypeid`=b_booktype.`pkid` \
        WHERE 1=1 "
        // if(typeof(strwhere)!=undefined){
        //     str = str + strwhere;  
        // }          

        console.log(str);
        sqlhelper.query(str,function(result){
            callback(result[0],result[1]);
        });
    },
    this.insert=function(bio,callback){
        var para=[bio.name,bio.sub_name,bio.isbn,bio.author,bio.press,bio.publicationdate,bio.instoragedate,bio.edition,bio.bookcover,bio.pagecount,bio.wordcount,bio.onstroge,bio.status,bio.point,bio.plandate,bio.recommend,bio.contentintroduction,bio.authorintroduction,bio.catelogue,bio.goodcomment,bio.goodhighlight];
        sqlhelper.querywithpara("insert into `b_book`(`name`,`sub_name`,`isbn`,`author`,`press`,`publicationdate`,`instoragedate`,`edition`,`bookcover`,`pagecount`,`wordcount`,`onstroge`,`status`,`point`,`plandate`,`recommend`,`contentintroduction`,`authorintroduction`,`catelogue`,`goodcomment`,`goodhighlight`)"+
        "values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
        para,
        function(result){
            callback(result);
        });
    },
    this.isexist=function(bio,callback){
        var para=[bio.isbn];
        sqlhelper.querywithpara("SELECT COUNT(*) as count FROM `b_book` WHERE `isbn` = ? ;  ",
        para,
        function(result){
            callback(result[0].count>0);
        });
    },
    this.detail=function(id,callback){
        var para=[id];
        sqlhelper.querywithpara("SELECT\
        *\
        FROM\
        b_book\
        WHERE pkid=?",
        para,
        function(result){
            callback(result[0]);
        });
    },
    this.detailbyisbn=function(isbn,callback){
        var para=[isbn];
        sqlhelper.querywithpara("SELECT * FROM b_book WHERE isbn=?",
        para,
        function(result){
            callback(result[0]);
        });
    }
}

module.exports=new b_book();