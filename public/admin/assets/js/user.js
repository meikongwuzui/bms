$(function(){
    var userinfo = JSON.parse( $.AMUI.utils.cookie.get('paul-userinfo') );
    $('.u-nickname').text(userinfo.nickname);
 })