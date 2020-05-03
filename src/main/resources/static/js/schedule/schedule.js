layui.use(['form','upload'], function () {
    var form = layui.form;

    $("#createBtn").on("click",function () {
        if(checkLogin2() != "ok"){

        }else{
            var content = $("textarea[name=content]").val();
            if(content == ''){
                layer.open({
                    offset: "auto"
                    ,content: '<p>内容不能为空</p>'
                    ,btn: '关闭'
                    ,btnAlign: 'c'
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
                return false;
            }

            var title = $("input[name=title]").val();

            if(title == ''){
                layer.open({
                    offset: "auto"
                    ,content: '<p>标题不能为空</p>'
                    ,btn: '关闭'
                    ,btnAlign: 'c'
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
                return false;
            }

            $.ajax({
                url: "/back/scheduleServices/createSchedule",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify({
                    "title": title,
                    "content": content
                }),
                beforeSend: function (XMLHttpRequest) {
                    XMLHttpRequest.setRequestHeader("Authorization", "ym:" + localStorage.getItem('token'));
                },
                error: function(xhr){
                    errorLogin($.parseJSON(xhr.responseText));
                    return false;
                },
                success: function (data) {
                    if(data.body == "success"){
                        alertmsgFtm("新增成功");
                        setTimeout(function () {
                            $(window).attr('location', '/');
                        },2500);
                    }else{
                        alertmsgFtm("操作失败,请稍后再试")
                    }

                }
            })
        }
    })
})