layui.use(['layer','upload','form'], function () {
    var layer = layui.layer
        ,form = layui.form
        ,upload = layui.upload;

    form.render();

    if(checkLogin() !="ok"){

    }else{
        $.ajax({
            url: "/back/userServices/pageUserInfo",
            contentType: "application/json",
            type: "post",
            data: JSON.stringify({"loginId": localStorage.getItem("loginId")}),
            success: function (data) {
                var rowData = data.body.data[0];
                var userPhoto = rowData.userPhoto ? (uploadUrl + rowData.userPhoto) : '/static/img/logo.png';
                var email = rowData.email?rowData.email:"";
                var lastLogIp = rowData.lastLogIp?rowData.lastLogIp:"";
                var lastLogTime = rowData.lastLogTime?rowData.lastLogTime:"";

                $(".profile-user1 .mail .value").text(email)
                $(".profile-user1 .phone .value").text(rowData.phone)
                $(".profile-user1 .lastIP .value").text(lastLogIp)
                $(".profile-user1 .lastTime .value").text(lastLogTime)
                $(".profile-user1 .blogCount .avalue").text(rowData.blogCountHj + "篇")
                $(".profile-user1 .blogCollCount .avalue").text(rowData.collectionNums + "篇")
                $(".profile-user1 .commentCount .avalue").text(rowData.commentNumsHj + "条")
                $(".profile-user1 .commentPraCount .avalue").text(rowData.commentPraiseNums + "条")

                $(".profile-user2 .profile-photo").attr("src", userPhoto)
                $(".profile-user2 .profile-loginId .value2").append(rowData.loginId)
                $(".profile-user2 .profile-name .value2").append(rowData.name)
                $(".profile-user2 .profile-sex .value2").append(rowData.sex)

                form.val('UserInfoForm', {
                    "name": rowData.name
                    , "sex": rowData.sex
                    , "email": rowData.email
                });
            }
        })
    }

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
                        "name":$("input[name=name]").val()
                        ,"email":$("input[name=email]").val()
                        ,"sex":$('input[name="sex"]:checked').val()
                        ,"userPhoto":photo
                    }),
                    beforeSend: function (XMLHttpRequest) {
                        XMLHttpRequest.setRequestHeader("Authorization", "ym:" + localStorage.getItem('token'));
                    },
                    error: function(xhr){
                        errorLogin($.parseJSON(xhr.responseText));
                        return false;
                    },
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
                $(".main .profile-list").empty();

                for(var i=0; i<rowData.length; i++){
                    var cover = rowData[i].cover ? (uploadUrl + rowData[i].cover) : '/static/img/logo.png';
                    var blogType = rowData[i].type == "0" ? "原创" : (rowData[i].type == "1" ? "转载" : "草稿");
                    var typeClass = rowData[i].type == "0"? "own" : (rowData[i].type == "1" ? "noOwn" : "testOwn");

                    var columnName = rowData[i].columnName? rowData[i].columnName : "";
                    var columnId = rowData[i].columnName? rowData[i].columnId : "";
                    var reason = rowData[i].reason? rowData[i].reason : "";

                    var str = rowData[i].content;  //html文字字符串
                    var con = str.replace(/\s*/g, "");  //去掉空格
                    var content =con.replace(/<[^>]+>/g, ""); //去掉所有的html标记

                    if(rowData[i].enable == "0"){
                        $(".main .profile-list").append(
                            '<div class="article-item">' +
                                '<div class="article-content">' +
                                    '<div class="article-cover">' +
                                        '<a href="/article/' + rowData[i].blogId +'" target="_blank">' +
                                            '<span class=' + typeClass + '>' + blogType +'</span><span class="noEnable">已失效</span><img src="'+ cover + '">' +
                                        '</a>' +
                                    '</div>' +
                                    '<div class="article-body">' +
                                        '<div class="article-title">' +
                                            '<div class="title"><a href="/article/' + rowData[i].blogId +'"  target="_blank">' + rowData[i].title + '</a></div>' +
                                            '<div class="userName"><i class="fa fa-user-secret" aria-hidden="true"></i><a href="/room/'+ rowData[i].userId + '">' + rowData[i].userName + '</a></div>' +
                                        '</div>' +
                                        '<p class="article-descrption">' + content + '</p>' +
                                        '<div class="article-meta">' +
                                            '<span class="date"><i class="fa fa-calendar" aria-hidden="true"></i><span>' + rowData[i].createTime + '</span></span>' +
                                            '<span class="view"><i class="fa fa-eye" aria-hidden="true"></i><span>' + rowData[i].viewNums + '</span></span>' +
                                            '<span class="comment"><i class="fa fa-commenting" aria-hidden="true"></i><span>' + rowData[i].commentNums + '</span></span>' +
                                            '<span class="collection"><i class="fa fa-heart" aria-hidden="true"></i><span>' + rowData[i].collectionNums + '</span></span>' +
                                            '<span class="columnName"><i class="fa fa-columns" aria-hidden="true"></i><a href="/column/'+ columnId + '">' + columnName + '</a></span>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>' +
                                '<div class="article-opera">' +
                                    '<div><button type="button" class="layui-btn layui-btn-danger" onclick="deleteBlog(\'' + rowData[i].blogId + '\');">删除</button></div>' +
                                '</div>' +
                            '</div>' +
                            '<div class="article-remark">' +
                                '<span class="reason">失效原因:' + reason + '</span>' +
                            '</div>'
                        )
                    }else if(rowData[i].enable == "1"){
                        $(".main .profile-list").append(
                            '<div class="article-item">' +
                            '<div class="article-content">' +
                            '<div class="article-cover">' +
                            '<a href="/article/' + rowData[i].blogId +'" target="_blank">' +
                            '<span class=' + typeClass + '>' + blogType +'</span><img src="'+ cover + '">' +
                            '</a>' +
                            '</div>' +
                            '<div class="article-body">' +
                            '<div class="article-title">' +
                            '<div class="title"><a href="/article/' + rowData[i].blogId +'"  target="_blank">' + rowData[i].title + '</a></div>' +
                            '<div class="userName"><i class="fa fa-user-secret" aria-hidden="true"></i><a href="/room/'+ rowData[i].userId + '">' + rowData[i].userName + '</a></div>' +
                            '</div>' +
                            '<p class="article-descrption">' + content + '</p>' +
                            '<div class="article-meta">' +
                            '<span class="date"><i class="fa fa-calendar" aria-hidden="true"></i><span>' + rowData[i].createTime + '</span></span>' +
                            '<span class="view"><i class="fa fa-eye" aria-hidden="true"></i><span>' + rowData[i].viewNums + '</span></span>' +
                            '<span class="comment"><i class="fa fa-commenting" aria-hidden="true"></i><span>' + rowData[i].commentNums + '</span></span>' +
                            '<span class="collection"><i class="fa fa-heart" aria-hidden="true"></i><span>' + rowData[i].collectionNums + '</span></span>' +
                            '<span class="columnName"><i class="fa fa-columns" aria-hidden="true"></i><a href="/column/'+ columnId + '">' + columnName + '</a></span>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="article-opera">' +
                                '<div style="margin-bottom: 10px;"><button type="button" class="layui-btn layui-btn-normal" onclick="editBlog(\'' + rowData[i].blogId + '\');">编辑</button></div>' +
                                '<div><button type="button" class="layui-btn layui-btn-danger" onclick="deleteBlog(\'' + rowData[i].blogId + '\');">删除</button></div>' +
                            '</div>' +
                            '</div>'
                        )
                    }else{
                        $(".main .profile-list").append(
                            '<div class="article-item">' +
                            '<div class="article-content">' +
                            '<div class="article-cover">' +
                            '<a href="/article/' + rowData[i].blogId +'" target="_blank">' +
                            '<span class=' + typeClass + '>' + blogType +'</span><span class="noReady">未审核</span><img src="'+ cover + '">' +
                            '</a>' +
                            '</div>' +
                            '<div class="article-body">' +
                            '<div class="article-title">' +
                            '<div class="title"><a href="/article/' + rowData[i].blogId +'"  target="_blank">' + rowData[i].title + '</a></div>' +
                            '<div class="userName"><i class="fa fa-user-secret" aria-hidden="true"></i><a href="/room/'+ rowData[i].userId + '">' + rowData[i].userName + '</a></div>' +
                            '</div>' +
                            '<p class="article-descrption">' + content + '</p>' +
                            '<div class="article-meta">' +
                            '<span class="date"><i class="fa fa-calendar" aria-hidden="true"></i><span>' + rowData[i].createTime + '</span></span>' +
                            '<span class="view"><i class="fa fa-eye" aria-hidden="true"></i><span>' + rowData[i].viewNums + '</span></span>' +
                            '<span class="comment"><i class="fa fa-commenting" aria-hidden="true"></i><span>' + rowData[i].commentNums + '</span></span>' +
                            '<span class="collection"><i class="fa fa-heart" aria-hidden="true"></i><span>' + rowData[i].collectionNums + '</span></span>' +
                            '<span class="columnName"><i class="fa fa-columns" aria-hidden="true"></i><a href="/column/'+ columnId + '">' + columnName + '</a></span>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="article-opera">' +
                            '<div style="margin-bottom: 10px;"><button type="button" class="layui-btn layui-btn-normal" onclick="editBlog(\'' + rowData[i].blogId + '\');">编辑</button></div>' +
                            '<div><button type="button" class="layui-btn layui-btn-danger" onclick="deleteBlog(\'' + rowData[i].blogId + '\');">删除</button></div>' +
                            '</div>' +
                            '</div>'
                        )
                    }


                }
                $(".main .profile-list").append('<div id="columnPage"></div>')
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
                $(".main .profile-list").empty();

                for(var i=0; i<rowData.length; i++){
                    if(rowData[i].title){
                        var cover = rowData[i].cover ? (uploadUrl + rowData[i].cover) : '/static/img/logo.png';
                        var blogType = rowData[i].type == "0" ? "原创" : "转载";
                        var typeClass = rowData[i].type == "0"? "own" : "noOwn";

                        var str = rowData[i].content;  //html文字字符串
                        var con = str.replace(/\s*/g, "");  //去掉空格
                        var content =con.replace(/<[^>]+>/g, ""); //去掉所有的html标记


                        if(rowData[i].enable == "0") {
                            $(".main .profile-list").append(
                                '<div class="article-item">' +
                                '<div class="article-content">' +
                                '<div class="article-cover">' +
                                '<a href="/article/' + rowData[i].blogId +'" target="_blank">' +
                                '<span class=' + typeClass + '>' + blogType +'</span><span class="noEnable">已失效</span><img src="'+ cover + '">' +
                                '</a>' +
                                '</div>' +
                                '<div class="article-body">' +
                                '<div class="article-title">' +
                                '<div class="title"><a href="/article/' + rowData[i].blogId +'"  target="_blank">' + rowData[i].title + '</a></div>' +
                                '<div class="userName"><i class="fa fa-user-secret" aria-hidden="true"></i><a href="/room/'+ rowData[i].userId + '">' + rowData[i].userName + '</a></div>' +
                                '</div>' +
                                '<p class="article-descrption">' + content + '</p>' +
                                '<div class="article-meta">' +
                                '<span class="date"><i class="fa fa-calendar" aria-hidden="true"></i><span>' + rowData[i].createTime + '</span></span>' +
                                '<span class="view"><i class="fa fa-eye" aria-hidden="true"></i><span>' + rowData[i].viewNums + '</span></span>' +
                                '<span class="comment"><i class="fa fa-commenting" aria-hidden="true"></i><span>' + rowData[i].commentNums + '</span></span>' +
                                '<span class="collection"><i class="fa fa-heart" aria-hidden="true"></i><span>' + rowData[i].collectionNums + '</span></span>' +
                                '<span class="columnName"><i class="fa fa-columns" aria-hidden="true"></i><a href="/column/'+ rowData[i].columnId + '">' + rowData[i].columnName + '</a></span>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="article-opera">' +
                                '<div><button type="button" class="layui-btn layui-btn-danger" onclick="deleteCollBlog(\'\',\'' + rowData[i].blogId + '\');">删除</button></div>' +                            '</div>' +
                                '</div>'
                            )
                        }else{
                            $(".main .profile-list").append(
                                '<div class="article-item">' +
                                '<div class="article-content">' +
                                '<div class="article-cover">' +
                                '<a href="/article/' + rowData[i].blogId +'" target="_blank">' +
                                '<span class=' + typeClass + '>' + blogType +'</span><img src="'+ cover + '">' +
                                '</a>' +
                                '</div>' +
                                '<div class="article-body">' +
                                '<div class="article-title">' +
                                '<div class="title"><a href="/article/' + rowData[i].blogId +'"  target="_blank">' + rowData[i].title + '</a></div>' +
                                '<div class="userName"><i class="fa fa-user-secret" aria-hidden="true"></i><a href="/room/'+ rowData[i].userId + '">' + rowData[i].userName + '</a></div>' +
                                '</div>' +
                                '<p class="article-descrption">' + content + '</p>' +
                                '<div class="article-meta">' +
                                '<span class="date"><i class="fa fa-calendar" aria-hidden="true"></i><span>' + rowData[i].createTime + '</span></span>' +
                                '<span class="view"><i class="fa fa-eye" aria-hidden="true"></i><span>' + rowData[i].viewNums + '</span></span>' +
                                '<span class="comment"><i class="fa fa-commenting" aria-hidden="true"></i><span>' + rowData[i].commentNums + '</span></span>' +
                                '<span class="collection"><i class="fa fa-heart" aria-hidden="true"></i><span>' + rowData[i].collectionNums + '</span></span>' +
                                '<span class="columnName"><i class="fa fa-columns" aria-hidden="true"></i><a href="/column/'+ rowData[i].columnId + '">' + rowData[i].columnName + '</a></span>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="article-opera">' +
                                '<div><button type="button" class="layui-btn layui-btn-danger" onclick="deleteCollBlog(\'\',\'' + rowData[i].blogId + '\');">删除</button></div>' +
                                '</div>' +
                                '</div>'
                            )
                        }
                    }else{
                        $(".main .profile-list").append(
                            '<div class="article-item">' +
                            '<div class="article-content">' +
                            '<div class="article-cover">' +
                            '<span class="noLive">原文被删除</span>' +
                            '</div>' +
                            '<div class="article-body">' +
                            '</div>' +
                            '</div>' +
                            '<div class="article-opera">' +
                            '<div><button type="button" class="layui-btn layui-btn-danger" onclick="deleteCollBlog(\'' + rowData[i].id + '\',\'\');">删除</button></div>' +
                            '</div>' +
                            '</div>'
                        )
                    }



                }
                $(".main .profile-list").append('<div id="columnPage"></div>')
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
                $(".main .profile-list").empty();

                for(var i=0; i<rowData.length; i++){
                    if(rowData[i].title){
                        var replyUserId = rowData[i].replyUserId?rowData[i].replyUserId:"";
                        var replyUserName = rowData[i].replyUserName?rowData[i].replyUserName:"";
                        var praiseNums = rowData[i].praiseNums?rowData[i].praiseNums:"";
                        if(rowData[i].enable == "0") {
                            if(praiseNums == ""){
                                $(".main .profile-list").append(
                                    '<div class="comment-item">' +
                                    '<div class="comment-content">' +
                                    '<div class="comment-head">' +
                                    '<span>回复:</span>' +
                                    '<span class="comment-replyName"><a href="/room/' + replyUserId + '">' + replyUserName + '</a></span>' +
                                    '<span class="comment-blog"><a href="/article/' + rowData[i].blogId + '">' + rowData[i].title + '</a></span>' +
                                    '</div>' +
                                    '<div class="comment-body">' +
                                    '<span class="comment-text">' + rowData[i].content + '</span>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="noEnable">已失效</div>' +
                                    '<div class="comment-opera">'  +
                                    '<button type="button" class="layui-btn layui-btn-danger" onclick="deleteReplyComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="comment-remark"><span class="reason">失效原因:' + rowData[i].reason + '</span>' +
                                    '</div>'
                                )
                            }else{
                                $(".main .profile-list").append(
                                    '<div class="comment-item">' +
                                    '<div class="comment-content">' +
                                    '<div class="comment-head">' +
                                    '<span>回复:</span>' +
                                    '<span class="comment-replyName"><a href="/room/' + replyUserId + '">' + replyUserName + '</a></span>' +
                                    '<span class="comment-blog"><a href="/article/' + rowData[i].blogId + '">' + rowData[i].title + '</a></span>' +
                                    '</div>' +
                                    '<div class="comment-body">' +
                                    '<span class="comment-text">' + rowData[i].content + '</span>' +
                                    '<span class="comment-praise">点赞数:' + praiseNums + '</span>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="noEnable">已失效</div>' +
                                    '<div class="comment-opera">'  +
                                    '<button type="button" class="layui-btn layui-btn-danger"  onclick="deleteComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="comment-remark"><span class="reason">失效原因:' + rowData[i].reason + '</span>' +
                                    '</div>'
                                )
                            }

                        }else{
                            if(praiseNums == ""){
                                $(".main .profile-list").append(
                                    '<div class="comment-item">' +
                                    '<div class="comment-content">' +
                                    '<div class="comment-head">' +
                                    '<span>回复:</span>' +
                                    '<span class="comment-replyName"><a href="/room/' + replyUserId + '">' + replyUserName + '</a></span>' +
                                    '<span class="comment-blog"><a href="/article/' + rowData[i].blogId + '">' + rowData[i].title + '</a></span>' +
                                    '</div>' +
                                    '<div class="comment-body">' +
                                    '<span class="comment-text">' + rowData[i].content + '</span>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="comment-opera">'  +
                                    '<button type="button" class="layui-btn layui-btn-danger"  onclick="deleteReplyComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>'
                                )
                            }else{
                                $(".main .profile-list").append(
                                    '<div class="comment-item">' +
                                    '<div class="comment-content">' +
                                    '<div class="comment-head">' +
                                    '<span>回复:</span>' +
                                    '<span class="comment-replyName"><a href="/room/' + replyUserId + '">' + replyUserName + '</a></span>' +
                                    '<span class="comment-blog"><a href="/article/' + rowData[i].blogId + '">' + rowData[i].title + '</a></span>' +
                                    '</div>' +
                                    '<div class="comment-body">' +
                                    '<span class="comment-text">' + rowData[i].content + '</span>' +
                                    '<span class="comment-praise">点赞数:' + praiseNums + '</span>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="comment-opera">'  +
                                    '<button type="button" class="layui-btn layui-btn-danger"  onclick="deleteComment(\'' + rowData[i].id + '\');">删除</button>' +
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
                                $(".main .profile-list").append(
                                    '<div class="comment-item">' +
                                    '<div class="comment-content">' +
                                    '<div class="comment-head">' +
                                    '<span>回复:</span>' +
                                    '<span class="comment-replyName"><a href="/room/' + replyUserId + '">' + replyUserName + '</a></span>' +
                                    '<span class="comment-blog">原文已被删除</span>' +
                                    '</div>' +
                                    '<div class="comment-body">' +
                                    '<span class="comment-text">' + rowData[i].content + '</span>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="noEnable">已失效</div>' +
                                    '<div class="comment-opera">'  +
                                    '<button type="button" class="layui-btn layui-btn-danger"  onclick="deleteReplyComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="comment-remark"><span class="reason">失效原因:' + rowData[i].reason + '</span>' +
                                    '</div>'
                                )
                            }else{
                                $(".main .profile-list").append(
                                    '<div class="comment-item">' +
                                    '<div class="comment-content">' +
                                    '<div class="comment-head">' +
                                    '<span>回复:</span>' +
                                    '<span class="comment-replyName"><a href="/room/' + replyUserId + '">' + replyUserName + '</a></span>' +
                                    '<span class="comment-blog">原文已被删除</span>' +
                                    '</div>' +
                                    '<div class="comment-body">' +
                                    '<span class="comment-text">' + rowData[i].content + '</span>' +
                                    '<span class="comment-praise">点赞数:' + praiseNums + '</span>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="noEnable">已失效</div>' +
                                    '<div class="comment-opera">'  +
                                    '<button type="button" class="layui-btn layui-btn-danger"  onclick="deleteComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="comment-remark"><span class="reason">失效原因:' + rowData[i].reason + '</span>' +
                                    '</div>'
                                )
                            }

                        }else{
                            if(praiseNums == ""){
                                $(".main .profile-list").append(
                                    '<div class="comment-item">' +
                                    '<div class="comment-content">' +
                                    '<div class="comment-head">' +
                                    '<span>回复:</span>' +
                                    '<span class="comment-replyName"><a href="/room/' + replyUserId + '">' + replyUserName + '</a></span>' +
                                    '<span class="comment-blog">原文已被删除</span>' +
                                    '</div>' +
                                    '<div class="comment-body">' +
                                    '<span class="comment-text">' + rowData[i].content + '</span>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="comment-opera">'  +
                                    '<button type="button" class="layui-btn layui-btn-danger"  onclick="deleteReplyComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>'
                                )
                            }else{
                                $(".main .profile-list").append(
                                    '<div class="comment-item">' +
                                    '<div class="comment-content">' +
                                    '<div class="comment-head">' +
                                    '<span>回复:</span>' +
                                    '<span class="comment-replyName"><a href="/room/' + replyUserId + '">' + replyUserName + '</a></span>' +
                                    '<span class="comment-blog">原文已被删除</span>' +
                                    '</div>' +
                                    '<div class="comment-body">' +
                                    '<span class="comment-text">' + rowData[i].content + '</span>' +
                                    '<span class="comment-praise">点赞数:' + praiseNums + '</span>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="comment-opera">'  +
                                    '<button type="button" class="layui-btn layui-btn-danger"  onclick="deleteComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>'
                                )
                            }

                        }
                    }

                }
                $(".main .profile-list").append('<div id="columnPage"></div>')
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
                $(".main .profile-list").empty();

                for(var i=0; i<rowData.length; i++){
                    if(rowData[i].content) {
                        if (rowData[i].enable == "0") {
                            if (rowData[i].title) {
                                $(".main .profile-list").append(
                                    '<div class="comment-item">' +
                                    '<div class="comment-content">' +
                                    '<div class="comment-head">' +
                                    '<span><a href="/room/' + rowData[i].userId + '">' + rowData[i].userName + '</a></span>' +
                                    '<span>回复:</span>' +
                                    '<span class="comment-blog"><a href="/article/' + rowData[i].blogId + '">' + rowData[i].title + '</a></span>' +
                                    '</div>' +

                                    '<div class="comment-body">' +
                                    '<span class="comment-text">' + rowData[i].content + '</span>' +
                                    '<span class="comment-praise">点赞数:' + rowData[i].praiseNums + '</span>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="noEnable">已失效</div>' +
                                    '<div class="comment-opera">' +
                                    '<button type="button" class="layui-btn layui-btn-danger" onclick="deletePraComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="comment-remark"><span class="reason">失效原因:' + rowData[i].reason + '</span>' +
                                    '</div>'
                                )
                            } else {
                                $(".main .profile-list").append(
                                    '<div class="comment-item">' +
                                    '<div class="comment-content">' +
                                    '<div class="comment-head">' +
                                    '<span><a href="/room/' + rowData[i].userId + '">' + rowData[i].userName + '</a></span>' +
                                    '<span>回复:</span>' +
                                    '<span class="comment-blog">原文被删除</span>' +
                                    '</div>' +

                                    '<div class="comment-body">' +
                                    '<span class="comment-text">' + rowData[i].content + '</span>' +
                                    '<span class="comment-praise">点赞数:' + rowData[i].praiseNums + '</span>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="noEnable">已失效</div>' +
                                    '<div class="comment-opera">' +
                                    '<button type="button" class="layui-btn layui-btn-danger" onclick="deletePraComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="comment-remark"><span class="reason">失效原因:' + rowData[i].reason + '</span>' +
                                    '</div>'
                                )
                            }
                        } else {
                            if (rowData[i].title) {
                                $(".main .profile-list").append(
                                    '<div class="comment-item">' +
                                    '<div class="comment-content">' +
                                    '<div class="comment-head">' +
                                    '<span><a href="/room/' + rowData[i].userId + '">' + rowData[i].userName + '</a></span>' +
                                    '<span>回复:</span>' +
                                    '<span class="comment-blog"><a href="/article/' + rowData[i].blogId + '">' + rowData[i].title + '</a></span>' +
                                    '</div>' +

                                    '<div class="comment-body">' +
                                    '<span class="comment-text">' + rowData[i].content + '</span>' +
                                    '<span class="comment-praise">点赞数:' + rowData[i].praiseNums + '</span>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="comment-opera">' +
                                    '<button type="button" class="layui-btn layui-btn-danger" onclick="deletePraComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>'
                                )
                            } else {
                                $(".main .profile-list").append(
                                    '<div class="comment-item">' +
                                    '<div class="comment-content">' +
                                    '<div class="comment-head">' +
                                    '<span><a href="/room/' + rowData[i].userId + '">' + rowData[i].userName + '</a></span>' +
                                    '<span>回复:</span>' +
                                    '<span class="comment-blog">原文被删除</span>' +
                                    '</div>' +

                                    '<div class="comment-body">' +
                                    '<span class="comment-text">' + rowData[i].content + '</span>' +
                                    '<span class="comment-praise">点赞数:' + rowData[i].praiseNums + '</span>' +
                                    '</div>' +
                                    '</div>' +
                                    '<div class="comment-opera">' +
                                    '<button type="button" class="layui-btn layui-btn-danger" onclick="deletePraComment(\'' + rowData[i].id + '\');">删除</button>' +
                                    '</div>' +
                                    '</div>'
                                )
                            }
                        }
                    }else {
                        $(".main .profile-list").append(
                            '<div class="comment-item">' +
                            '<div class="comment-content">' +
                            '<div class="noLive">评论被删除</div>' +
                            '</div>' +
                            '<div class="comment-opera">' +
                            '<button type="button" class="layui-btn layui-btn-danger" onclick="deletePraComment(\'' + rowData[i].id + '\');">删除</button>' +
                            '</div>' +
                            '</div>'
                        )
                    }
                }
                $(".main .profile-list").append('<div id="columnPage"></div>')
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
            elem: 'columnPage',
            count: count,
            theme: '#53e8b8',
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
                    data: JSON.stringify({
                        "blogId":id
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
                    data: JSON.stringify({
                        "blogId":blogId,
                        "id":id
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
                    data: JSON.stringify({
                        "id":id
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
                    data: JSON.stringify({
                        "id":id
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
                    data: JSON.stringify({
                        "id":id
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

function loginOut() {
    localStorage.clear();
    $(window).attr('location', '/login');
}
