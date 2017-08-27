$(function(){
    var userinfo = JSON.parse( $.AMUI.utils.cookie.get('paul-userinfo') );
    $('.u-nickname').text(userinfo.nickname);

    //登陆按钮
    $('#btnlogin').on('click', function () {
        // 处理异步验证结果
        $.when($('#form-loginfo').validator('isFormValid')).then(function (isValidate) {
            if (isValidate) {
                login();
            } else {
            }
        });
    });

    //退出按钮
    $('.am-icon-sign-out').on('click',function(){
        $.AMUI.utils.cookie.unset('paul-userinfo');
        location.href='./login'
    })
 });

 function login() {
    $.ajax({
        type: "POST",
        url: "login",
        data: $('#form-loginfo').serialize(),
        dataType: 'json',
        success: function (res) {
            if (res.status) {
                $.AMUI.utils.cookie.set('paul-userinfo', JSON.stringify(res.data));
                location.href='index';
            }
            else {
                alert(res.msg);
            }
        },
        error: function (msg) {
            alert(msg);
        }
    });
}