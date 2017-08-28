var express=require('express');
var booktype=require('./sql/booktype');
var book=require('./sql/book');

var router=express.Router();

router.get('/booktype/getlist',function(req,res){
    booktype.getlist(function(result){
     res.status(200).send(result);
    });
 })
 
 //所有图书
 router.get('/book/allbook',function(req,res){
    book.getallbook(function(result){
        res.render('../views/book/allbook',{booklist:result});
    });
})
//根据图书分类ID 获取图书列表
 router.get('/book/list',function(req,res){
     if(req.query.t){
         book.getlist(req.query.t,function(result){
             res.render('../views/book/list',{booklist:result});
         });
     }
     else{
         res.status(200).send('无效的图书类别');
     }
 })
 //分页获取图书
 router.get('/book/pagequery',function(req,res){ 
    var pagemodel={
         currentpage : parseInt(req.query.currentpage) - 1,
         pagesize : req.query.pagesize,
         orderby : req.query.orderby,
         ordertype : req.query.ordertype
    };
    var wheremodel={};
    book.pagelist(pagemodel,wheremodel,function(data,modal){
        var allcount = modal[0].count;
        if(allcount%pagemodel.pagesize==0){
            pagemodel.pagecount=allcount/pagemodel.pagesize;
        }else{
            pagemodel.pagecount=allcount/pagemodel.pagesize+1;
        }
        pagemodel.currentpage=pagemodel.currentpage+1;
        if(pagemodel.currentpage*pagemodel.pagesize>=allcount){
            pagemodel.hasnext=false;
        }else{
            pagemodel.hasnext=true;
        }
        if(pagemodel.currentpage==1){
            pagemodel.hasprev=false;
        }else{
            pagemodel.hasprev=true;
        }
        res.render('../views/book/allbook',{booklist:data,paging:pagemodel});
    });
})
 
 router.get('/book/detail',function(req,res){
     if(req.query.b){
         book.detail(req.query.b,function(result){
             console.log('book tail'+result);
             res.render('../views/book/detail',{book:result});
         });
     }
     else if(req.query.isbn){
         console.log('isbn:' + req.query.isbn.split(',')[1]);
        var openid=req.query.openid;
        book.detailbyisbn(req.query.isbn.split(',')[1],function(result){
            // console.log('book tail:'+result);
            res.render('../views/book/detail',{book:result},function(err,html){
                res.cookie('userinfo',{openid:openid}).send(html);
            });
        });
    }
     else{
         res.status(200).send('无效的图书');
     }
 })

 router.post('/book/add',function(req,res){
    var bookinfo=req.body;
    book.isexist(bookinfo,function(resul){
        if(resul){
            res.send('{"status":false,"msg":"book is exist"}');
        }else{
            book.insert(bookinfo,function(result){
                res.status(200).send('{"status":true,"msg":"入库成功"}');
            });
        }
    });
});

module.exports=router;