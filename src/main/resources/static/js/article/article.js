var url = window.location.href
var blogId;


//查询博客信息
$.ajax({
    url: "/back/blogServices/pageBlogInfo",
    contentType: "application/json",
    type: "post",
    data: JSON.stringify({"blogId":url.substr(url.lastIndexOf("/")+1),"ifCollection": localStorage.getItem("loginId")}),
    success: function (data) {
        var rowData = data.body.data[0];
        if(rowData.enable == "0"){
            $(window).attr('location', '/404');
        }else if(rowData.enable == "2" || rowData.type == "2"){
            var loginId = localStorage.getItem("loginId");
            if(rowData.userId != loginId){
                $(window).attr('location', '/404');
            }else{
                blogId = rowData.blogId;

                var url = rowData.cover?(uploadUrl+rowData.cover):'/static/img/logo.png';
                var type = (rowData.type == "0")?'原创':(rowData.type == "1"?'转载':'草稿');
                var enable = rowData.enable == "2"?"未审核":"";
                $(".detail-type span").text(type);
                $(".user span").text(rowData.userName);
                $(".date span").text(rowData.createTime);
                $('title').text('YeBlog - 博客 - ' + rowData.title);
                $(".detail-title h2").text(rowData.title);
                $("img.detail-cover").attr("src",url);
                $(".detail-content").append(rowData.content);

                editormd.markdownToHTML("blogContent");

            }
        }else{
            blogId = rowData.blogId;

            var url = rowData.cover?(uploadUrl+rowData.cover):'/static/img/logo.png';
            var type = (rowData.type == "0")?'原创':'转载';
            $(".detail-type span").text(type);
            $(".user span").text(rowData.userName);
            $(".date span").text(rowData.createTime);
            $(".viewNums span").text(rowData.viewNums);
            $('title').text('YeBlog - 博客 - ' + rowData.title);
            $(".detail-title h2").text(rowData.title);
            $("img.detail-cover").attr("src",url);
            $(".detail-content").append(rowData.content);

            editormd.markdownToHTML("blogContent");

            $(".detail").append('<div class="collectionBtn">' +
                '<div class="collectionIcon"></div>' +
                '<div class="collectionNums"><span></span></div>' +
                '</div>\n' +
                '<div class="detail-meta">' +
                '<p class=\'item\'><span class="date">本文发布于</span><span class="viewNums">,被观看了</span></p>' +
                '<p class=\'item\'><span class="userName">本文作者:</span><a class="userNamea" href="" target="_blank"></a></p>' +
                '<p class=\'item\'><span class="columnName">本文专栏:</span><a class="columnNamea" href="" target="_blank"></a></p>' +
                '</div>' +
                '<div class="detail-comment">' +
                '<div class="comment-box">' +
                '<div class="comment-create">' +
                '<form class="layui-form" action="">' +
                '</form>' +
                '</div>' +
                '<div class="comment-top">' +
                '<div class="total">' +
                '<div class="count">' +
                '<strong class="count">' +
                '</strong>' +
                '<span>条评论</span>' +
                '</div>' +
                '</div>' +
                '<div class="sort">' +
                '<a href="javascript:;" class="sort-btn1" onclick="queryComment(1,\'time\');">最新</a>' +
                '<a href="javascript:;" class="sort-btn2" onclick="queryComment(1,\'praiseNums\');">最热</a>' +
                '</div>' +
                '</div>' +
                '<div class="comment-list">' +
                '<ul class="list-box">' +
                '</ul>' +
                '</div>' +
                '</div>' +
                '<div id="commentPage"></div>' +
                '</div>'
            )

            if(rowData.hasOwnProperty("ifCollection")){
                if(rowData.ifCollection == "true"){
                    $(".collectionIcon").html("<a href='javascript:;' onclick='loseCollection();'><i>已收藏</i></a>");
                }else{
                    $(".collectionIcon").html("<a href='javascript:;' onclick='toCollection();'><i>收藏</i></a>");
                }
            }else{
                $(".collectionIcon").html("<a href='javascript:;' onclick='toCollection();'><i>收藏</i></a>");

            }
            $(".collectionNums span").text(rowData.collectionNums);

            $(".detail-meta .date").text("本文发布于" + rowData.createTime);
            $(".detail-meta .viewNums").text(",被观看了" + rowData.viewNums);
            $(".userNamea").attr("href","/room/" + rowData.userId);
            $(".userNamea").text(rowData.userName);
            $(".columnNamea").attr("href","/column/" + rowData.columnId);
            $(".columnNamea").text(rowData.columnName);

            $(".total strong").text(rowData.commentNums);

            createCommentHtml();
            addView();
            queryComment(1,"time");
        }




    }
})

//添加点击量
function addView() {
    $.ajax({
        url: "/back/blogServices/createBlogView",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify({"blogId":url.substr(url.lastIndexOf("/")+1)})
    })
}

//查询评论
function queryComment(pageIndex,sort){
    $.ajax({
        url: "/back/commentServices/pageCommentInfo",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify({"blogId":url.substr(url.lastIndexOf("/")+1),"sort":sort,"pageIndex":pageIndex,"ifPraise": localStorage.getItem("loginId")}),
        success: function (data) {
            $("ul.list-box").empty();
            var rowData = data.body.data;
            for(var i=0; i<rowData.length; i++){
                var userPhoto = rowData[i].userPhoto?(uploadUrl+rowData[i].userPhoto):'/static/img/logo.png';

                if(rowData[i].hasOwnProperty("ifPraise")){
                    if(rowData[i].ifPraise == "true"){
                        $(".comment-list ul.list-box").append('<li class="comment-item">' +
                            '<div class="userPhoto"><img src="' + userPhoto + '"></div>' +
                            '<div class="comment-body">' +
                            '<div class="comment-header">' +
                            '<a href="/room/' + rowData[i].userId + '" target="_blank">' + rowData[i].userName +'</a>' +
                            '<span class="floor">' + rowData[i].rank +'</span> ' +
                            '</div>' +
                            '<div class="comment-content">' + rowData[i].content +
                            '</div>' +
                            '<div class="comment-foot">' +
                            '<span class="time">' + rowData[i].time + '</span>' +
                            '<a href="javascript:;" class="reply" onclick="replyCommentFirst(\'' + rowData[i].id + '\',this)"><i></i><span>回复</span></a>' +
                            '<div class="like"><a href="javascript:;" onclick="losePraise(\'' + rowData[i].id + '\',' + i +',this)"><i>已赞</i></a></div><span class="praiseCount praiseCount' + i + '">' + rowData[i].praiseNums + '</span>' +
                            '</div>' +
                            '</div>' +
                            '<div class="reply-list reply-list' + i + '"><ul class="reply-list-box"></ul></div>' +
                            '<div class="createReplyClass"></div>' +
                            '</li>'
                        )
                    }else{
                        $(".comment-list ul.list-box").append('<li class="comment-item">' +
                            '<div class="userPhoto"><img src="' + userPhoto + '"></div>' +
                            '<div class="comment-body">' +
                            '<div class="comment-header">' +
                            '<a href="/room/' + rowData[i].userId + '" target="_blank">' + rowData[i].userName +'</a>' +
                            '<span class="floor">' + rowData[i].rank +'</span> ' +
                            '</div>' +
                            '<div class="comment-content">' + rowData[i].content +
                            '</div>' +
                            '<div class="comment-foot">' +
                            '<span class="time">' + rowData[i].time + '</span>' +
                            '<a href="javascript:;" class="reply" onclick="replyCommentFirst(\'' + rowData[i].id + '\',this)"><i></i><span>回复</span></a>' +
                            '<div class="like"><a href="javascript:;" onclick="toPraise(\'' + rowData[i].id + '\',' + i +',this)"><i>赞</i></a></div><span class="praiseCount praiseCount'+ i +'">' + rowData[i].praiseNums + '</span>' +
                            '</div>' +
                            '</div>' +
                            '<div class="reply-list reply-list' + i + '"><ul class="reply-list-box"></ul></div>' +
                            '<div class="createReplyClass"></div>' +
                            '</li>'
                        )
                    }
                }else{
                    $(".comment-list ul.list-box").append('<li class="comment-item">' +
                        '<div class="userPhoto"><img src="' + userPhoto + '"></div>' +
                        '<div class="comment-body">' +
                        '<div class="comment-header">' +
                        '<a href="/room/' + rowData[i].userId + '" target="_blank">' + rowData[i].userName +'</a>' +
                        '<span class="floor">' + rowData[i].rank +'</span> ' +
                        '</div>' +
                        '<div class="comment-content">' + rowData[i].content +
                        '</div>' +
                        '<div class="comment-foot">' +
                        '<span class="time">' + rowData[i].time + '</span>' +
                        '<a href="javascript:;" class="reply" onclick="replyCommentFirst(\'' + rowData[i].id + '\',this)"><i></i><span>回复</span></a>' +
                        '<div class="like"><a href="javascript:;" onclick="toPraise(\'' + rowData[i].id + '\',' + i +',this)"><i>赞</i></a></div><span class="praiseCount praiseCount' + i + '">' + rowData[i].praiseNums + '</span>' +
                        '</div>' +
                        '</div>' +
                        '<div class="reply-list reply-list' + i + '"><ul class="reply-list-box"></ul></div>' +
                        '<div class="createReplyClass"></div>' +
                        '</li>'
                    )
                }




                var replyData = rowData[i].comments;

                if(replyData != null && replyData.length != 0){
                    for(var j=0; j<replyData.length; j++){
                        var replyUserPhoto = replyData[j].userPhoto?(uploadUrl+replyData[j].userPhoto):'/static/img/logo.png';
                        if(replyData[j].replyUserId){
                            $(".reply-list" + i + " ul.reply-list-box").append('<li class="reply-comment-item">' +
                                '<div class="reply-userPhoto"><img src="' + replyUserPhoto + '"></div>' +
                                '<div class="reply-comment-body">' +
                                '<div class="reply-comment-header">' +
                                '<a href="/room/' + replyData[j].userId + '" target="_blank">' + replyData[j].userName +'</a>' +
                                '</div>' +
                                '<div class="reply-comment-content"><span class="reply-user">回复 <a href="/room/' + replyData[j].replyUserId + '" target="_blank">' + replyData[j].replyUserName + ' : </a></span>' + replyData[j].content +
                                '</div>' +
                                '<div class="reply-comment-foot">' +
                                '<span class="reply-time">' + replyData[j].time + '</span>' +
                                '<a href="javascript:;" class="reply-reply" onclick="replyComment(\'' + rowData[i].id + '\',\'' + replyData[j].userId +'\',this)"><i></i><span>回复</span></a>' +
                                '</div>' +
                                '</div>' +
                                '</li>'
                            )
                        }else{
                            $(".reply-list" + i + " ul.reply-list-box").append('<li class="reply-comment-item">' +
                                '<div class="reply-userPhoto"><img src="' + replyUserPhoto + '"></div>' +
                                '<div class="reply-comment-body">' +
                                '<div class="reply-comment-header">' +
                                '<a href="/room/' + replyData[j].userId + '" target="_blank">' + replyData[j].userName +'</a>' +
                                '</div>' +
                                '<div class="reply-comment-content"><span class="reply-user">回复 : </span>' + replyData[j].content +
                                '</div>' +
                                '<div class="reply-comment-foot">' +
                                '<span class="reply-time">' + replyData[j].time + '</span>' +
                                '<a href="javascript:;" class="reply-reply" onclick="replyComment(\'' + rowData[i].id + '\',\'' + replyData[j].userId +'\',this)"><i></i><span>回复</span></a>' +
                                '</div>' +
                                '</div>' +
                                '</li>'
                            )
                        }



                    }
                }
            }
            showCommentPage(data.body.pager.recordCount,data.body.pager.pageIndex);
        }
    })
}

//分页
function showCommentPage(count,pageIndex){
    layui.use(['laypage'], function(){
        var laypage = layui.laypage;

        //完整功能
        laypage.render({
            elem: 'commentPage',
            count: count,
            theme: '#009587',
            curr : pageIndex,
            jump: function(obj,first){
                if(!first){
                    queryComment(obj.curr);
                }
            }
        });
    });
}

//判断是否有用户信息做不同的操作
function createCommentHtml(){
    if(localStorage.getItem('token')){
        $(".comment-create form").html('<div class="layui-form-item layui-form-text">' +
            '<div class="layui-input-block">' +
            '<textarea placeholder="请输入内容" name="comment" class="layui-textarea"></textarea>' +
            '</div>' +
            '</div>' +
            '<div class="layui-form-item">' +
            '<div class="layui-input-block">'+
            '<button type="button" id="createComment" class="layui-btn">发送</button>' +
            '</div></div>'
        )

        $("#createComment").on("click",function () {
            if(checkLogin() != "ok"){

            }
            else{
                var content = $("textarea[name=comment]").val();
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

                $.ajax({
                    url: "/back/commentServices/createComment",
                    type: "post",
                    contentType: "application/json",
                    data: JSON.stringify({
                        "content": content,
                        "userId": localStorage.getItem("loginId"),
                        "blogId": blogId

                    }),
                    success: function (data) {
                        if(data.body == "success"){
                            alertmsgFtm("新增成功");
                            //$(window).attr('location', url)
                        }else{
                            alertmsgFtm("操作失败,请稍后再试")
                        }

                    }
                })
            }
        })
    }
    else{
        $(".comment-create form").html('<div class="layui-form-item layui-form-text">' +
            '<div class="layui-input-block">' +
            '<textarea placeholder="你未登录,无法评论,请登录!" class="layui-textarea" readonly=""></textarea>' +
            '</div>' +
            '</div>' +
            '<div class="layui-form-item">' +
            '<div class="layui-input-block">'+
            '<button type="button" id="createComment" class="layui-btn layui-btn-disabled">发送</button>' +
            '</div></div>'
        )
    }
}

function replyCommentFirst(id,obj){
    if($(obj).parent().parent().parent().find(".createReplyClass").html() == ""){

        if(localStorage.getItem('token')){
            $(obj).parent().parent().parent().find(".createReplyClass").html('<div class="layui-form-item layui-form-text">' +
                '<div class="layui-input-block">' +
                '<textarea placeholder="请输入内容" name="replyCommentFirst" class="layui-textarea"></textarea>' +
                '</div>' +
                '</div>' +
                '<div class="layui-form-item">' +
                '<div class="layui-input-block">'+
                '<button type="button" id="createReplyCommentFirst" class="layui-btn">发送</button>' +
                '</div></div>'
            )

            $("#createReplyCommentFirst").on("click",function () {
                if(checkLogin() != "ok"){

                }

                else{
                    $.ajax({
                        url: "/back/commentServices/createReplyComment",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "id": id,
                            "content": $("textarea[name=replyCommentFirst]").val(),
                            "userId": localStorage.getItem("loginId"),
                            "replyUserId": "",
                            "blogId": blogId

                        }),
                        success: function (data) {
                            if(data.body == "success"){
                                alertmsgFtm("新增成功");
                                setTimeout(function(){
                                        $(window).attr('location', url);
                                    },2500
                                );
                            }else{
                                alertmsgFtm("操作失败,请稍后再试")
                            }

                        }
                    })
                }
            })
        }
        else{
            $(obj).parent().parent().parent().find(".createReplyClass").html('<div class="layui-form-item layui-form-text">' +
                '<div class="layui-input-block">' +
                '<textarea placeholder="你未登录,无法评论,请登录!" class="layui-textarea" readonly=""></textarea>' +
                '</div>' +
                '</div>' +
                '<div class="layui-form-item">' +
                '<div class="layui-input-block">'+
                '<button type="button" id="createReplyCommentFirst" class="layui-btn layui-btn-disabled">发送</button>' +
                '</div></div>'
            )
        }

    }else{
        $(obj).parent().parent().parent().find(".createReplyClass").html("")
    }
}

function replyComment(id,userId,obj){

    if($(obj).parent().parent().parent().parent().parent().parent().find(".createReplyClass").html() == ""){

        if(localStorage.getItem('token')){
            $(obj).parent().parent().parent().parent().parent().parent().find(".createReplyClass").html('<div class="layui-form-item layui-form-text">' +
                '<div class="layui-input-block">' +
                '<textarea placeholder="请输入内容" name="replyComment" class="layui-textarea"></textarea>' +
                '</div>' +
                '</div>' +
                '<div class="layui-form-item">' +
                '<div class="layui-input-block">'+
                '<button type="button" id="createReplyComment" class="layui-btn">发送</button>' +
                '</div></div>'
            )

            $("#createReplyComment").on("click",function () {
                if(checkLogin() != "ok"){

                }else{
                    $.ajax({
                        url: "/back/commentServices/createReplyComment",
                        type: "post",
                        contentType: "application/json",
                        data: JSON.stringify({
                            "id": id,
                            "content": $("textarea[name=replyComment]").val(),
                            "userId": localStorage.getItem("loginId"),
                            "replyUserId": userId,
                            "blogId": blogId

                        }),
                        success: function (data) {
                            if(data.body == "success"){
                                alertmsgFtm("新增成功");
                                setTimeout(function(){
                                        $(window).attr('location', url);
                                    },2500
                                );
                            }else{
                                alertmsgFtm("操作失败,请稍后再试")
                            }

                        }
                    })
                }
            })
        }
        else{
            $(obj).parent().parent().parent().parent().parent().parent().find(".createReplyClass").html('<div class="layui-form-item layui-form-text">' +
                '<div class="layui-input-block">' +
                '<textarea placeholder="你未登录,无法评论,请登录!" class="layui-textarea" readonly=""></textarea>' +
                '</div>' +
                '</div>' +
                '<div class="layui-form-item">' +
                '<div class="layui-input-block">'+
                '<button type="button" id="createReplyComment" class="layui-btn layui-btn-disabled">发送</button>' +
                '</div></div>'
            )
        }

    }else{
        $(obj).parent().parent().parent().parent().parent().parent().find(".createReplyClass").html("")
    }
}

function toCollection() {
    if(checkLogin() != "ok"){

    }

    else{
        $.ajax({
            url: "/back/blogServices/createBlogCollection",
            type: "post",
            contentType: "application/json",
            data: JSON.stringify({
                "userId": localStorage.getItem("loginId"),
                "blogId": blogId

            }),
            success: function (data) {
                if(data.body == "success"){
                    alertmsgFtm("收藏成功");

                    $(".collectionIcon").html("<a href='javascript:;' onclick='loseCollection();'><i>已收藏</i></a>");
                    $(".collectionNums span").text(Number($(".collectionNums span").text())+1);

                }else{
                    alertmsgFtm("操作失败,请稍后再试")
                }

            }
        })
    }
}

function loseCollection() {
    if(checkLogin() != "ok"){

    }
    else{
        $.ajax({
            url: "/back/blogServices/deleteBlogCollection",
            type: "post",
            contentType: "application/json",
            data: JSON.stringify({
                "userId": localStorage.getItem("loginId"),
                "blogId": blogId

            }),
            success: function (data) {
                if(data.body == "success"){
                    alertmsgFtm("取消收藏成功");

                    $(".collectionIcon").html("<a href='javascript:;' onclick='toCollection();'><i>收藏</i></a>");
                    $(".collectionNums span").text(Number($(".collectionNums span").text())-1);
                }else{
                    alertmsgFtm("操作失败,请稍后再试")
                }

            }
        })
    }

}

function toPraise(id,i,obj) {
    if(checkLogin() != "ok"){

    }

    else{
        $.ajax({
            url: "/back/commentServices/createCommentPraise",
            type: "post",
            contentType: "application/json",
            data: JSON.stringify({
                "userId": localStorage.getItem("loginId"),
                "id": id

            }),
            success: function (data) {
                if(data.body == "success"){
                    alertmsgFtm("点赞成功");

                    $(obj).parent().html('<a href="javascript:;" onclick="losePraise(\'' + id + '\',' + i +',this)"><i>已赞</i></a>')
                    $(".praiseCount"+i).text(Number($(".praiseCount"+i).text()) +1)
                }else{
                    alertmsgFtm("操作失败,请稍后再试")
                }

            }
        })
    }
}

function losePraise(id,i,obj) {
    if(checkLogin() != "ok"){

    }
    else{
        $.ajax({
            url: "/back/commentServices/deleteCommentPraise",
            type: "post",
            contentType: "application/json",
            data: JSON.stringify({
                "userId": localStorage.getItem("loginId"),
                "id": id
            }),
            success: function (data) {
                if(data.body == "success"){
                    alertmsgFtm("取消点赞成功");

                    $(obj).parent().html('<a href="javascript:;" onclick="toPraise(\'' + id + '\',' + i +',this)"><i>赞</i></a>')
                    $(".praiseCount"+i).text(Number($(".praiseCount"+i).text()) -1)
                }else{
                    alertmsgFtm("操作失败,请稍后再试")
                }

            }
        })
    }

}