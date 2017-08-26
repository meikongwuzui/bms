$(function(){
    var userinfo = JSON.parse( $.AMUI.utils.cookie.get('paul-userinfo') );
    $('#u-nickname').val(userinfo.nickname);
 })