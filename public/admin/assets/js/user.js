$(function(){
    var userinfo = $.AMUI.utils.cookie.get('paul-userinfo');
    $('#u-nickname').val(userinfo.nickname);
 })