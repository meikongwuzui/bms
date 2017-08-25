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
 
 router.get('/book/detail',function(req,res){
     if(req.query.b){
         // book.getlist(req.query.b,function(result){
             res.render('../views/book/detail');
         // });
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