window.onload = function(){ 
    var transhref=  location.protocol + '//' + location.hostname + location.pathname;
    $('ul.am-pagination li.cantransform a').on('click',function(){
      var page = $(this).attr('data-href');
      location.href= transhref + '?currentpage='+page+'&pagesize=3&orderby=pkid&ordertype=desc';
    })
  };