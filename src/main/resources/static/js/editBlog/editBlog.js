layui.use(['form','upload'], function () {
    var form = layui.form,
        layer = layui.layer,
        upload = layui.upload;
    form.render();

    var url = window.location.href
    var blogId = url.substr(url.lastIndexOf("/")+1);

    if(checkLogin() != "ok"){

    }else{

        $.ajax({
            url: "/back/blogServices/pageBlogInfo",
            contentType: "application/json",
            type: "post",
            data: JSON.stringify({"blogId": blogId}),
            success: function (data) {
                var rowData = data.body.data[0];
                var loginId = localStorage.getItem("loginId");
                if(rowData.enable == "0"){
                    $(window).attr('location', '/404');
                }else if(rowData.userId != loginId){
                    $(window).attr('location', '/404');

                }else{
                    $("input[name=title]").val(rowData.title);
                    $("select[name=type]").val(rowData.type);
                    columnSelect.setValue([ rowData.columnId ])
                    $("#blog-editor textarea").val(rowData.contentmd)
                    form.render();
                }
            }
        })

        //编辑器
        var editor = editormd("blog-editor", {
            width  : "100%",
            height : "800px",
            path   : "/static/modules/editor.md-master/lib/",
            saveHTMLToTextarea : true
        });

        //为专栏名称下拉框赋值
        var columnSelect = xmSelect.render({
            el: '#column',
            filterable: true,
            paging: true,
            pageSize: 4,
            name: 'columnId',
            radio: true,
            toolbar: {show: true},
            data: []
        })

        $.ajax({
            url: "/back/columnServices/listColumnInfo",
            type: "post",
            contentType: "application/json",
            data: JSON.stringify({}),
            success: function (data) {
                columnSelect.update({ "data": data.body })
            }
        })

        var cover = "";

        upload.render({
            elem: '#cover'
            , accept: 'file' //普通文件
            , url: '/back/uploadServices/fileUpload'
            , before: function (obj) {
                checkLogin();
                layer.msg('上传中');
            }
            , done: function (res) {
                if (res.head.code != "0") {
                    alertmsgFtmIndex(res.head.msg);
                    return false;
                }
                //上传成功
                cover = res.body.fileId;
                layer.msg('上传成功');
            }
        });


        $("#updateBtn").on("click",function () {
            var content = editor.getPreviewedHTML();
            var contentmd = editor.getMarkdown();
            if(content == ''){
                layer.open({
                    offset: "auto"
                    ,content: '<p>文章内容不能为空</p>'
                    ,btn: '关闭'
                    ,btnAlign: 'c'
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
                return false;
            }

            var title = $("input[name=title]").val()

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

            var column = columnSelect.getValue("valueStr");

            if(column == ''){
                layer.open({
                    offset: "auto"
                    ,content: '<p>专栏不能为空</p>'
                    ,btn: '关闭'
                    ,btnAlign: 'c'
                    ,yes: function(){
                        layer.closeAll();
                    }
                });
                return false;
            }

            var type = $("select[name=type]").val()

            var enable;
            if(type == "2"){
                enable = "1";
            }else{
                enable = "2";
            }

            $.ajax({
                url: "/back/blogServices/updateBlogInfo",
                type: "post",
                contentType: "application/json",
                data: JSON.stringify({
                    "title": title,
                    "content": content,
                    "contentmd": contentmd,
                    "enable": enable,
                    "type": type,
                    "newColumnId": column,
                    "cover": cover,
                    "blogId": blogId

                }),
                success: function (data) {
                    if(data.body == "success"){
                        alertmsgFtm("更新成功");
                        $(window).attr('location', '/')
                    }else{
                        alertmsgFtm("操作失败,请稍后再试")
                    }

                }
            })

        })
    }




});
