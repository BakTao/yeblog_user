checkLogin();
layui.use(['layer','upload','form'], function () {
    var layer = layui.layer
        ,form = layui.form
        ,upload = layui.upload;

    form.render();

    $.ajax({
        url: "/back/userServices/pageUserInfo",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify({"loginId": localStorage.getItem("loginId")}),
        success: function (data) {
            var rowData = data.body.data[0];
            var userPhoto = rowData.userPhoto ? (uploadUrl + rowData.userPhoto) : '/static/img/logo.png';

            $(".profile-user1 .mail .value").text(rowData.email)
            $(".profile-user1 .phone .value").text(rowData.phone)
            $(".profile-user1 .lastIP .value").text(rowData.lastLogIp)
            $(".profile-user1 .lastTime .value").text(rowData.lastLogTime)
            $(".profile-user1 .blogCount .avalue").text(rowData.blogCountHj + "篇")
            $(".profile-user1 .blogCollCount .avalue").text(rowData.collectionNums + "篇")
            $(".profile-user1 .commentCount .avalue").text(rowData.commentNumsHj + "条")
            $(".profile-user1 .commentPraCount .avalue").text(rowData.commentPraiseNums + "条")

            $(".profile-user2 .profile-photo").attr("src", userPhoto)
            $(".profile-user2 .profile-loginId .value2").text(rowData.loginId)
            $(".profile-user2 .profile-name .value2").text(rowData.name)
            $(".profile-user2 .profile-sex .value2").text(rowData.sex)

            form.val('UserInfoForm', {
                "name": rowData.name
                , "sex": rowData.sex
                , "email": rowData.email
            });
        }
    })

    var photo;

    upload.render({
        elem: '#photo'
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
            photo = res.body.fileId;
            layer.msg('上传成功');
        }
    });

    $("#updateBtn").on("click",function () {
        layer.open({
            type: 1
            , area: ['30%', '55%']
            , offset: 'auto'
            , content: $("#UserInfo")
            , btn: ['更新','关闭']
            , btnAlign: 'c'
            , yes: function () {
                $.ajax({
                    url: "/back/userServices/updateUserInfo",
                    contentType: "application/json",
                    type: "post",
                    data: JSON.stringify({
                        "loginId": localStorage.getItem("loginId")
                        ,"name":$("input[name=name]").val()
                        ,"email":$("input[name=email]").val()
                        ,"sex":$('input[name="sex"]:checked').val()
                        ,"userPhoto":photo
                    }),
                    success: function (data) {
                        if(data.body == 'success'){
                            alertmsgFtm("更新成功");
                            setTimeout(function () {
                                $(window).attr('location', '/profile')
                            }, 2000);
                        }else{
                            alertmsgFtmIndex("更新失败,请稍后再试");
                        }
                    }
                })
            }
        });

    });

});

function getBCData(type,pageIndex){

    if(type == "blog"){
        $.ajax({
            url: "/back/blogServices/pageBlogInfo",
            contentType: "application/json",
            type: "post",
            data: JSON.stringify({"userId": localStorage.getItem("loginId"),"pageIndex":pageIndex}),
            success: function (data) {
                var rowData = data.body.data;
                $(".main .list").empty();

                for(var i=0; i<rowData.length; i++){
                    var cover = rowData[i].cover ? (uploadUrl + rowData[i].cover) : '/static/img/logo.png';
                    var blogType = rowData[i].type == "0" ? "原创" : (rowData[i].type == "1" ? "转载" : "草稿");
                    var columnName = rowData[i].columnName? rowData[i].columnName : "";
                    if(rowData[i].enable == "0"){
                        $(".main .list").append(
                            '<div class="article-item">' +
                            '<div class="article-content">' +
                            '<div class="article-cover">' +
                            '<a href="/article/' + rowData[i].blogId +'" target="_blank">' +
                            '<span>' + blogType +'</span><img src="'+ cover + '">' +
                            '</a>' +
                            '</div>' +
                            '<div class="article-body">' +
                            '<h5 class="article-title">' +
                            '<a href="/article/' + rowData[i].blogId +'"  target="_blank">' + rowData[i].title + '</a>' +
                            '</h5>' +
                            '<p class="article-descrption">' + rowData[i].content + '</p>' +
                            '<div class="article-meta">' +
                            '<span class="date"><i></i><span>' + rowData[i].createTime + '</span></span>' +
                            '<span class="userName"><i></i><span>' + rowData[i].userName + '</span></span>' +
                            '<span class="view"><i></i><span>' + rowData[i].viewNums + '</span></span>' +
                            '<span class="comment"><i></i><span>' + rowData[i].commentNums + '</span></span>' +
                            '<span class="collection"><i></i><span>' + rowData[i].collectionNums + '</span></span>' +
                            '<span class="columnName"><i></i><span>' + columnName + '</span></span>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div><span>无效</span><span>原因:' + rowData[i].reason + '</span>' +
                            '</div>' +
                            '<div><button onclick="deleteBlog(\'' + rowData[i].blogId + '\');">删除</button>' +
                            '</div>' +
                            '</div>'
                        )
                    }else{
                        $(".main .list").append(
                            '<div class="article-item">' +
                            '<div class="article-content">' +
                            '<div class="article-cover">' +
                            '<a href="/article/' + rowData[i].blogId +'" target="_blank">' +
                            '<span>' + blogType +'</span><img src="'+ cover + '">' +
                            '</a>' +
                            '</div>' +
                            '<div class="article-body">' +
                            '<h5 class="article-title">' +
                            '<a href="/article/' + rowData[i].blogId +'"  target="_blank">' + rowData[i].title + '</a>' +
                            '</h5>' +
                            '<p class="article-descrption">' + rowData[i].content + '</p>' +
                            '<div class="article-meta">' +
                            '<span class="date"><i></i><span>' + rowData[i].createTime + '</span></span>' +
                            '<span class="userName"><i></i><spanf>' + rowData[i].userName + '</spanf></span>' +
                            '<span class="view"><i></i><span>' + rowData[i].viewNums + '</span></span>' +
                            '<span class="comment"><i></i><span>' + rowData[i].commentNums + '</span></span>' +
                            '<span class="collection"><i></i><span>' + rowData[i].collectionNums + '</span></span>' +
                            '<span class="columnName"><i></i><span>' + columnName + '</span></span>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div>' +
                            '<button onclick="editBlog(\'' + rowData[i].blogId + '\');">编辑</button>' +
                            '<button onclick="deleteBlog(\'' + rowData[i].blogId + '\');">删除</button>' +
                            '</div>' +
                            '</div>'
                        )
                    }


                }
                $(".main .list").append('<div id="page"></div>')
                showPage(type,data.body.pager.recordCount,data.body.pager.pageIndex);
            }
        })
    }else if(type == "collBlog"){
        $.ajax({
            url: "/back/blogServices/pageCollectionBlog",
            contentType: "application/json",
            type: "post",
            data: JSON.stringify({"userId": localStorage.getItem("loginId"),"pageIndex":pageIndex}),
            success: function (data) {
                var rowData = data.body.data;
                $(".main .list").empty();

                for(var i=0; i<rowData.length; i++){
                    if(rowData[i].title){
                        var cover = rowData[i].cover ? (uploadUrl + rowData[i].cover) : '/static/img/logo.png';
                        var blogType = rowData[i].type == "0" ? "原创" : "转载";

                        if(rowData[i].enable == "0") {
                            $(".main .list").append(
                                '<div class="article-item">' +
                                '<div class="article-content">' +
                                '<div class="article-cover">' +
                                '<a href="/article/' + rowData[i].blogId +'" target="_blank">' +
                                '<span>' + blogType + '</span><img src="' + cover + '">' +
                                '</a>' +
                                '</div>' +
                                '<div class="article-body">' +
                                '<h5 class="article-title">' +
                                '<a href="/article/' + rowData[i].blogId + '"  target="_blank">' + rowData[i].title + '</a>' +
                                '</h5>' +
                                '<p class="article-descrption">' + rowData[i].content + '</p>' +
                                '<div class="article-meta">' +
                                '<span class="date"><i></i><span>' + rowData[i].createTime + '</span></span>' +
                                '<span class="userName"><i></i><span>' + rowData[i].userName + '</span></span>' +
                                '<span class="view"><i></i><span>' + rowData[i].viewNums + '</span></span>' +
                                '<span class="comment"><i></i><span>' + rowData[i].commentNums + '</span></span>' +
                                '<span class="collection"><i></i><span>' + rowData[i].collectionNums + '</span></span>' +
                                '<span class="columnName"><i></i><span>' + rowData[i].columnName + '</span></span>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div><span>已失效</span>' +
                                '</div>' +
                                '<div>'  +
                                '<button onclick="deleteCollBlog(\'\',\'' + rowData[i].blogId + '\');">删除</button>' +
                                '</div>' +
                                '</div>'
                            )
                        }else{
                            $(".main .list").append(
                                '<div class="article-item">' +
                                '<div class="article-content">' +
                                '<div class="article-cover">' +
                                '<a href="/article/' + rowData[i].blogId + '" target="_blank">' +
                                '<span>' + blogType + '</span><img src="' + cover + '">' +
                                '</a>' +
                                '</div>' +
                                '<div class="article-body">' +
                                '<h5 class="article-title">' +
                                '<a href="/article/' + rowData[i].blogId + '"  target="_blank">' + rowData[i].title + '</a>' +
                                '</h5>' +
                                '<p class="article-descrption">' + rowData[i].content + '</p>' +
                                '<div class="article-meta">' +
                                '<span class="date"><i></i><span>' + rowData[i].createTime + '</span></span>' +
                                '<span class="userName"><i></i><span>' + rowData[i].userName + '</span></span>' +
                                '<span class="view"><i></i><span>' + rowData[i].viewNums + '</span></span>' +
                                '<span class="comment"><i></i><span>' + rowData[i].commentNums + '</span></span>' +
                                '<span class="collection"><i></i><span>' + rowData[i].collectionNums + '</span></span>' +
                                '<span class="columnName"><i></i><span>' + rowData[i].columnName + '</span></span>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div>'  +
                                '<button onclick="deleteCollBlog(\'\',\'' + rowData[i].blogId + '\');">删除</button>' +
                                '</div>' +
                                '</div>'
                            )
                        }
                    }else{
                        $(".main .list").append(
                            '<div class="article-item">文章已被删除' +
                            '<div>'  +
                            '<button onclick="deleteCollBlog(\'' + rowData[i].id + '\',\'\');">删除</button>' +
                            '</div>' +
                            '</div>'
                        )
                    }



                }
                $(".main .list").append('<div id="page"></div>')
                showPage(type,data.body.pager.recordCount,data.body.pager.pageIndex);
            }
        })
    }else if(type == "comment"){
        $.ajax({
            url: "/back/commentServices/pageUserCommentInfo",
            contentType: "application/json",
            type: "post",
            data: JSON.stringify({"userId": localStorage.getItem("loginId"),"pageIndex":pageIndex}),
            success: function (data) {
                var rowData = data.body.data;
                $(".main .list").empty();

                for(var i=0; i<rowData.length; i++){
                    if(rowData[i].title){
                        var replyUserId = rowData[i].replyUserId?rowData[i].replyUserId:"";
                        var replyUserName = rowData[i].replyUserName?rowData[i].replyUserName:"";
                        var praiseNums = rowData[i].praiseNums?rowData[i].praiseNums:"";
                        if(rowData[i].enable == "0") {
                            if(praiseNums == ""){
                                $(".main .list").append(
                                    '<div class="comment-item">' +
                                    '<div>' +
                                    '<span>回复:</span>' +
                                    '<span><a href="/room/' + replyUserId + '">' + replyUserName + '</a></span>' +
                                    '<span><a href="/article/' + rowData[i].blogId + '">' + rowData[i].title + '</a></span>' +
                                    '</div>' +
                                    '<div><span>无效</span><span>原因:' + rowData[i].reason + '</span>' +
                                    '</div>' +
                                    '<div><span>' + rowData[i].content + '</span></div>' +
                                    '<div>'  +
                                    '<button onclick="deleteReplyComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>'
                                )
                            }else{
                                $(".main .list").append(
                                    '<div class="comment-item">' +
                                    '<div>' +
                                    '<span>回复:</span>' +
                                    '<span><a href="/article/' + rowData[i].blogId + '">' + rowData[i].title + '</a></span>' +
                                    '<span>点赞数:' + praiseNums + '</span>' +
                                    '</div>' +
                                    '<div><span>无效</span><span>原因:' + rowData[i].reason + '</span>' +
                                    '</div>' +
                                    '<div><span>' + rowData[i].content + '</span></div>' +
                                    '<div>'  +
                                    '<button onclick="deleteComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>'
                                )
                            }

                        }else{
                            if(praiseNums == ""){
                                $(".main .list").append(
                                    '<div class="comment-item">' +
                                    '<div>' +
                                    '<span>回复:</span>' +
                                    '<span><a href="/room/' + replyUserId + '">' + replyUserName + '</a></span>' +
                                    '<span><a href="/article/' + rowData[i].blogId + '">' + rowData[i].title + '</a></span>' +
                                    '</div>' +
                                    '<div><span>' + rowData[i].content + '</span></div>' +
                                    '<div>'  +
                                    '<button onclick="deleteReplyComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>'
                                )
                            }else{
                                $(".main .list").append(
                                    '<div class="comment-item">' +
                                    '<div>' +
                                    '<span>回复:</span>' +
                                    '<span><a href="/article/' + rowData[i].blogId + '">' + rowData[i].title + '</a></span>' +
                                    '<span>点赞数:' + praiseNums + '</span>' +
                                    '</div>' +
                                    '<div><span>' + rowData[i].content + '</span></div>' +
                                    '<div>'  +
                                    '<button onclick="deleteComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>'
                                )
                            }

                        }
                    }else{
                        var replyUserId = rowData[i].replyUserId?rowData[i].replyUserId:"";
                        var replyUserName = rowData[i].replyUserName?rowData[i].replyUserName:"";
                        var praiseNums = rowData[i].praiseNums?rowData[i].praiseNums:"";
                        if(rowData[i].enable == "0") {
                            if(praiseNums == ""){
                                $(".main .list").append(
                                    '<div class="comment-item">' +
                                    '<div>' +
                                    '<span>回复:</span>' +
                                    '<span><a href="/room/' + replyUserId + '">' + replyUserName + '</a></span>' +
                                    '<span>原文已被删除</span>' +
                                    '</div>' +
                                    '<div><span>无效</span><span>原因:' + rowData[i].reason + '</span>' +
                                    '</div>' +
                                    '<div><span>' + rowData[i].content + '</span></div>' +
                                    '<div>'  +
                                    '<button onclick="deleteReplyComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>'
                                )
                            }else{
                                $(".main .list").append(
                                    '<div class="comment-item">' +
                                    '<div>' +
                                    '<span>回复:</span>' +
                                    '<span>原文已被删除</span>' +
                                    '<span>点赞数:' + praiseNums + '</span>' +
                                    '</div>' +
                                    '<div><span>无效</span><span>原因:' + rowData[i].reason + '</span>' +
                                    '</div>' +
                                    '<div><span>' + rowData[i].content + '</span></div>' +
                                    '<div>'  +
                                    '<button onclick="deleteComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>'
                                )
                            }

                        }else{
                            if(praiseNums == ""){
                                $(".main .list").append(
                                    '<div class="comment-item">' +
                                    '<div>' +
                                    '<span>回复:</span>' +
                                    '<span><a href="/room/' + replyUserId + '">' + replyUserName + '</a></span>' +
                                    '<span>原文已被删除</span>' +
                                    '</div>' +
                                    '<div><span>' + rowData[i].content + '</span></div>' +
                                    '<div>'  +
                                    '<button onclick="deleteReplyComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>'
                                )
                            }else{
                                $(".main .list").append(
                                    '<div class="comment-item">' +
                                    '<div>' +
                                    '<span>回复:</span>' +
                                    '<span>原文已被删除</span>' +
                                    '<span>点赞数:' + praiseNums + '</span>' +
                                    '</div>' +
                                    '<div><span>' + rowData[i].content + '</span></div>' +
                                    '<div>'  +
                                    '<button onclick="deleteComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>'
                                )
                            }

                        }
                    }

                }
                $(".main .list").append('<div id="page"></div>')
                showPage(type,data.body.pager.recordCount,data.body.pager.pageIndex);
            }
        })
    }else if(type == "praComment"){
        $.ajax({
            url: "/back/commentServices/pagePraiseCommentInfo",
            contentType: "application/json",
            type: "post",
            data: JSON.stringify({"userId": localStorage.getItem("loginId"),"pageIndex":pageIndex}),
            success: function (data) {
                var rowData = data.body.data;
                $(".main .list").empty();

                for(var i=0; i<rowData.length; i++){
                    if(rowData[i].content) {
                        if (rowData[i].enable == "0") {
                            $(".main .list").append(
                                '<div class="comment-item">' +
                                '<div>' +
                                '<span><a href="/room/' + rowData[i].userId + '">' + rowData[i].userName + '</a></span>' +
                                '<span>回复:</span>' +
                                '<span><a href="/article/' + rowData[i].blogId + '">' + rowData[i].title + '</a></span>' +
                                '<span>点赞数:' + rowData[i].praiseNums + '</span>' +
                                '</div>' +
                                '<div><span>无效</span><span>原因:' + rowData[i].reason + '</span>' +
                                '</div>' +
                                '<div><span>' + rowData[i].content + '</span></div>' +
                                '<div>' +
                                '<button onclick="deletePraComment(\'' + rowData[i].id + '\');">删除</button>' +
                                '</div>' +
                                '</div>'
                            )
                        } else {
                            $(".main .list").append(
                                '<div class="comment-item">' +
                                '<div>' +
                                '<span><a href="/room/' + rowData[i].userId + '">' + rowData[i].userName + '</a></span>' +
                                '<span>回复:</span>' +
                                '<span><a href="/article/' + rowData[i].blogId + '">' + rowData[i].title + '</a></span>' +
                                '<span>点赞数:' + rowData[i].praiseNums + '</span>' +
                                '</div>' +
                                '<div><span>' + rowData[i].content + '</span></div>' +
                                '<div>' +
                                '<button onclick="deletePraComment(\'' + rowData[i].id + '\');">删除</button>' +
                                '</div>' +
                                '</div>'
                            )
                        }
                    }else{
                        $(".main .list").append(
                            '<div class="comment-item">评论已被删除' +
                            '<div>'  +
                            '<button onclick="deletePraComment(\'' + rowData[i].id + '\');">删除</button>' +
                            '</div>' +
                            '</div>'
                        )
                    }
                }
                $(".main .list").append('<div id="page"></div>')
                showPage(type,data.body.pager.recordCount,data.body.pager.pageIndex);
            }
        })
    }
}

//分页
function showPage(type,count,pageIndex){
    layui.use(['laypage'], function(){
        var laypage = layui.laypage;

        //完整功能
        laypage.render({
            elem: 'page',
            count: count,
            theme: '#009587',
            curr : pageIndex,
            jump: function(obj,first){
                if(!first){
                    getBCData(type,obj.curr);
                }
            }
        });
    });
}

function editBlog(id){
    $(window).attr('location', '/editBlog/'+id);
}

function deleteBlog(id){
    layui.use(['layer'], function () {
        var layer = layui.layer;

        layer.open({
            offset: "auto"
            ,content: '<p>是否确认</p>'
            ,btn: ['确认','关闭']
            ,btnAlign: 'c'
            ,yes: function(){
                $.ajax({
                    url: "/back/blogServices/deleteBlog",
                    contentType: "application/json",
                    type: "post",
                    data: JSON.stringify({"userId": localStorage.getItem("loginId"),"blogId":id}),
                    success: function (data) {
                        if(data.body == "success"){
                            alertmsgFtm("删除成功");
                            setTimeout(function(){
                                    $(window).attr('location', '/profile');
                                },2500
                            );

                        }else{
                            alertmsgFtm("删除失败,请稍后再试");
                        }

                    }
                })
            }
        });
    })
}

function deleteCollBlog(id,blogId) {
    layui.use(['layer'], function () {
        var layer = layui.layer;

        layer.open({
            offset: "auto"
            ,content: '<p>是否确认</p>'
            ,btn: ['确认','关闭']
            ,btnAlign: 'c'
            ,yes: function(){
                $.ajax({
                    url: "/back/blogServices/deleteBlogCollection",
                    contentType: "application/json",
                    type: "post",
                    data: JSON.stringify({"userId": localStorage.getItem("loginId"),"blogId":blogId,"id":id}),
                    success: function (data) {
                        if(data.body == "success"){
                            alertmsgFtm("删除成功");
                            setTimeout(function(){
                                    $(window).attr('location', '/profile');
                                },2500
                            );

                        }else{
                            alertmsgFtm("删除失败,请稍后再试");
                        }

                    }
                })
            }
        });
    })
}

function deletePraComment(id) {
    layui.use(['layer'], function () {
        var layer = layui.layer;

        layer.open({
            offset: "auto"
            ,content: '<p>是否确认</p>'
            ,btn: ['确认','关闭']
            ,btnAlign: 'c'
            ,yes: function(){
                $.ajax({
                    url: "/back/commentServices/deleteCommentPraise",
                    contentType: "application/json",
                    type: "post",
                    data: JSON.stringify({"userId": localStorage.getItem("loginId"),"id":id}),
                    success: function (data) {
                        if(data.body == "success"){
                            alertmsgFtm("删除成功");
                            setTimeout(function(){
                                    $(window).attr('location', '/profile');
                                },2500
                            );

                        }else{
                            alertmsgFtm("删除失败,请稍后再试");
                        }

                    }
                })
            }
        });
    })
}

function deleteComment(id) {
    layui.use(['layer'], function () {
        var layer = layui.layer;

        layer.open({
            offset: "auto"
            ,content: '<p>是否确认</p>'
            ,btn: ['确认','关闭']
            ,btnAlign: 'c'
            ,yes: function(){
                $.ajax({
                    url: "/back/commentServices/deleteComment",
                    contentType: "application/json",
                    type: "post",
                    data: JSON.stringify({"userId": localStorage.getItem("loginId"),"id":id}),
                    success: function (data) {
                        if(data.body == "success"){
                            alertmsgFtm("删除成功");
                            setTimeout(function(){
                                    $(window).attr('location', '/profile');
                                },2500
                            );

                        }else{
                            alertmsgFtm("删除失败,请稍后再试");
                        }

                    }
                })
            }
        });
    })
}

function deleteReplyComment(id) {
    layui.use(['layer'], function () {
        var layer = layui.layer;

        layer.open({
            offset: "auto"
            ,content: '<p>是否确认</p>'
            ,btn: ['确认','关闭']
            ,btnAlign: 'c'
            ,yes: function(){
                $.ajax({
                    url: "/back/commentServices/deleteReplyComment",
                    contentType: "application/json",
                    type: "post",
                    data: JSON.stringify({"userId": localStorage.getItem("loginId"),"id":id}),
                    success: function (data) {
                        if(data.body == "success"){
                            alertmsgFtm("删除成功");
                            setTimeout(function(){
                                    $(window).attr('location', '/profile');
                                },2500
                            );

                        }else{
                            alertmsgFtm("删除失败,请稍后再试");
                        }

                    }
                })
            }
        });
    })
}

