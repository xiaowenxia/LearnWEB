/**
 * Created by lixj on 2015/8/14.
 *  js判断input输入框中是否有值，以此来判断是否隐藏默认提示信息
 *  使用keyup事件
 */
$(function() {
    $('#id_email_input').on('keyup',function() {
        var len = document.getElementById('id_email_input').value; 
        if(len == ''){
            $('#id_email_label').show();
        }else{
            $('#id_email_label').hide();
        }
    });
    $('#id_passwd_input').on('keyup',function() {
        var len = document.getElementById('id_passwd_input').value; 
        if(len == ''){
            $('#id_passwd_label').show();
        }else{
            $('#id_passwd_label').hide();
        }
    });
})