$('.form-control').on("focus", function() {
    $(this).parent('.input-group').addClass("input-group-focus");
}).on("blur", function() {
    $(this).parent(".input-group").removeClass("input-group-focus");
});

$("#loginBtn").on("click",function () {
    var loginId = $("input[name=loginId]").val();
    var password = $("input[name=password]").val();

    if(loginId == ''){
        alertmsgFtm("用户名不能为空")
        return false;
    }

    if(password == ''){
        alertmsgFtm("密码不能为空")
        return false;
    }

    $.ajax({
        type:"post",
        url:"/back/userLoginServices/userLogin",
        contentType:"application/json",
        data:JSON.stringify({
            "loginId": loginId,
            "password": password
        }),
        success: function(data){
            if(data.head.code == "601"){
                alertmsgFtm(data.head.msg);
                return false;
            }
            else{
                localStorage.setItem('token', data.body.token)
                $(window).attr('location', '/')
            }
        },
        error: function(){
            alertmsgFtm("操作失败,请稍后再试")
        }
    })
})