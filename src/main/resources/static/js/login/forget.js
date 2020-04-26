$(function(){
    //发送验证码
    $("#sendCodeBtn").on("click", function(){
        var phone = $("input[name=phone]").val();
        if(phone == ''){
            alertmsgFtm("请输入手机号");
            return false;
        }
        showTimerout();

        $.ajax({
            type: "get",
            url: "/back/userLoginServices/sendYzm?phone="+phone,
            success: function (data) {
                if(data.head.code != '0'){
                    alertmsgTm("发送验证码失败");
                    return false;
                }else{
                    alertmsgTm("发送验证码成功");
                }
            }
        });
    })

    $("#forgetBtn").on("click", function(){
        var password = $("input[name=password]").val();
        var passwordAgain = $("input[name=passwordAgain]").val();
        var phone = $("input[name=phone]").val();
        var verifyCode = $("input[name=verifyCode]").val();

        if(phone == ''){
            alertmsgFtm("请输入手机号");
            return false;
        }
        if(verifyCode == ''){
            alertmsgFtm("请输入验证码");
            return false;
        }
        if(password == ''){
            alertmsgFtm("请输入密码");
            return false;
        }
        if(password != passwordAgain){
            alertmsgFtm("两次密码输入不正确");
            return false;
        }


        $.ajax({
            type: "post",
            url: "/back/userLoginServices/forget",
            contentType: "application/json",
            data: JSON.stringify({
                "newPassword": password,
                "phone": phone,
                "verifyCode": verifyCode
            }),
            success: function (data) {
                if(data.head.code != '0'){
                    alertmsgFtm(data.head.msg);
                    return false;
                }else{
                    alertmsgFtm("找回成功");
                    setTimeout(function () {
                        $(window).attr('location', '/login')
                    }, 2000);
                }
            }
        });
    })
});

function showTimerout() {
    var sum=120;
    var timerr=setInterval(function () {
        $("#sendCodeBtn").text(sum + "秒");
        $("#sendCodeBtn").attr("disabled","");
        $("#sendCodeBtn").css("cursor","not-allowed");
        $("#sendCodeBtn").css("background-color","wheat");
        sum--;
    }, 1000);
    setTimeout(function () {
        window.clearTimeout(timerr);
        $("#sendCodeBtn").text("发送验证码");
        $("#sendCodeBtn").removeAttr("disabled");
        $("#sendCodeBtn").css("cursor","pointer");
        $("#sendCodeBtn").css("background-color","#fa7a50");
    }, 121000);
}