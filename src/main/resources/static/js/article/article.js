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
                var typeClass = (rowData.type == "0")?'ownType':(rowData.type == "1"?'noOwnType':'testOwnType');
                var enable = rowData.enable == "2"?"未审核":"";

                $(".detail-type span").text(type);
                $(".detail-type").addClass(typeClass);
                $(".user").append(rowData.userName);
                $(".date").append(rowData.createTime);
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
            var typeClass = (rowData.type == "0")?'ownType':'noOwnType';

            $(".detail-type span").text(type);
            $(".detail-type").addClass(typeClass);

            $(".user").append(rowData.userName);
            $(".date").append(rowData.createTime);
            $(".viewNums").append(rowData.viewNums);
            $('title').text('YeBlog - 博客 - ' + rowData.title);
            $(".detail-title h2").text(rowData.title);
            $("img.detail-cover").attr("src",url);
            $(".detail-content").append(rowData.content);

            editormd.markdownToHTML("blogContent");

            $(".main").append('<div class="detail-collection"><div class="collectionBtn">' +
                '<div class="collectionIcon"></div>' +
                '<div class="collectionNums"><span></span></div>' +
                '</div></div>' +
                '<div class="detail-meta">' +
                '<p class="item"><span class="date">本文发布于</span><span class="viewNums">,被观看了</span></p>' +
                '<p class="item"><span class="userName">本文作者:</span><a class="userNamea" href="" target="_blank"></a></p>' +
                '<p class="item"><span class="columnName">本文专栏:</span><a class="columnNamea" href="" target="_blank"></a></p>' +
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
                '<a href="javascript:;" class="sort-btn1" onclick="queryComment(1,\'time\');"><i class="fa fa-caret-square-o-down" aria-hidden="true"></i>最新</a>' +
                '<a href="javascript:;" class="sort-btn2" onclick="queryComment(1,\'praiseNums\');"><i class="fa fa-caret-square-o-down" aria-hidden="true"></i>最热</a>' +
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
                    $(".collectionIcon").html("<a href='javascript:;' onclick='loseCollection();'><i class=\"fa fa-heart\" aria-hidden=\"true\"></i>已收藏</a>");
                }else{
                    $(".collectionIcon").html("<a href='javascript:;' onclick='toCollection();'><i class=\"fa fa-heart-o\" aria-hidden=\"true\"></i>收藏</i></a>");
                }
            }else{
                $(".collectionIcon").html("<a href='javascript:;' onclick='toCollection();'><i class=\"fa fa-heart-o\" aria-hidden=\"true\"></i>收藏</i></a>");

            }
            $(".collectionNums span").text(rowData.collectionNums);

            $(".detail-meta .date").text("本文发布于" + rowData.createTime);
            $(".detail-meta .viewNums").text(",被观看了" + rowData.viewNums+"次");
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
    if(sort == "time"){
        $(".comment-top a.sort-btn1").css("color","red");
        $(".comment-top a.sort-btn2").css("color","black");
    }else{
        $(".comment-top a.sort-btn2").css("color","red");
        $(".comment-top a.sort-btn1").css("color","black");
    }


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
                        $(".comment-list ul.list-box").append('<li class="comment-item"><div class="comment-item-area">' +
                            '<div class="userPhoto"><img src="' + userPhoto + '"></div>' +
                            '<div class="comment-body">' +
                            '<div class="comment-header">' +
                            '<a href="/room/' + rowData[i].userId + '" target="_blank">' + rowData[i].userName +'</a>' +
                            '<span class="floor">#' + rowData[i].rank +'</span> ' +
                            '</div>' +
                            '<div class="comment-content">' + rowData[i].content +
                            '</div>' +
                            '<div class="comment-foot">' +
                            '<span class="time"><i class="fa fa-clock-o" aria-hidden="true"></i>' + rowData[i].time + '</span>' +
                            '<a href="javascript:;" class="reply" onclick="replyCommentFirst(\'' + rowData[i].id + '\',this)"><i class="fa fa-reply" aria-hidden="true"></i>回复</a>' +
                            '<div class="like"><a href="javascript:;" onclick="losePraise(\'' + rowData[i].id + '\',' + i +',this)"><i class="fa fa-thumbs-up" aria-hidden="true"></i>已赞</a></div><span class="praiseCount praiseCount' + i + '">' + rowData[i].praiseNums + '</span>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="reply-list reply-list' + i + '"><ul class="reply-list-box"></ul></div>' +
                            '<div class="createReplyClass"></div>' +
                            '</li>'
                        )
                    }else{
                        $(".comment-list ul.list-box").append('<li class="comment-item"><div class="comment-item-area">' +
                            '<div class="userPhoto"><img src="' + userPhoto + '"></div>' +
                            '<div class="comment-body">' +
                            '<div class="comment-header">' +
                            '<a href="/room/' + rowData[i].userId + '" target="_blank">' + rowData[i].userName +'</a>' +
                            '<span class="floor">#' + rowData[i].rank +'</span> ' +
                            '</div>' +
                            '<div class="comment-content">' + rowData[i].content +
                            '</div>' +
                            '<div class="comment-foot">' +
                            '<span class="time"><i class="fa fa-clock-o" aria-hidden="true"></i>' + rowData[i].time + '</span>' +
                            '<a href="javascript:;" class="reply" onclick="replyCommentFirst(\'' + rowData[i].id + '\',this)"><i class="fa fa-reply" aria-hidden="true"></i>回复</a>' +
                            '<div class="like"><a href="javascript:;" onclick="toPraise(\'' + rowData[i].id + '\',' + i +',this)"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>赞</a></div><span class="praiseCount praiseCount'+ i +'">' + rowData[i].praiseNums + '</span>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="reply-list reply-list' + i + '"><ul class="reply-list-box"></ul></div>' +
                            '<div class="createReplyClass"></div>' +
                            '</li>'
                        )
                    }
                }else{
                    $(".comment-list ul.list-box").append('<li class="comment-item"><div class="comment-item-area">' +
                        '<div class="userPhoto"><img src="' + userPhoto + '"></div>' +
                        '<div class="comment-body">' +
                        '<div class="comment-header">' +
                        '<a href="/room/' + rowData[i].userId + '" target="_blank">' + rowData[i].userName +'</a>' +
                        '<span class="floor">#' + rowData[i].rank +'</span> ' +
                        '</div>' +
                        '<div class="comment-content">' + rowData[i].content +
                        '</div>' +
                        '<div class="comment-foot">' +
                        '<span class="time"><i class="fa fa-clock-o" aria-hidden="true"></i>' + rowData[i].time + '</span>' +
                        '<a href="javascript:;" class="reply" onclick="replyCommentFirst(\'' + rowData[i].id + '\',this)"><i class="fa fa-reply" aria-hidden="true"></i>回复</a>' +
                        '<div class="like"><a href="javascript:;" onclick="toPraise(\'' + rowData[i].id + '\',' + i +',this)"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>赞</a></div><span class="praiseCount praiseCount' + i + '">' + rowData[i].praiseNums + '</span>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div class="reply-list reply-list' + i + '"><ul class="reply-list-box"></ul></div>' +
                        '<div class="createReplyClass"></div>' +
                        '</li>'
                    )
                }


                var replyData = rowData[i].comments;

                if(replyData.data != null && replyData.data.length != 0){
                    $(".reply-list" + i + " ul.reply-list-box").empty();
                    var replyCommentData = replyData.data;
                    for(var j=0; j<replyCommentData.length; j++){
                        var replyUserPhoto = replyCommentData[j].userPhoto?(uploadUrl+replyCommentData[j].userPhoto):'/static/img/logo.png';
                        if(replyCommentData[j].replyUserId){
                            $(".reply-list" + i + " ul.reply-list-box").append('<li class="reply-comment-item">' +
                                '<div class="reply-comment-item-area">' +
                                '<div class="reply-userPhoto"><img src="' + replyUserPhoto + '"></div>' +
                                '<div class="reply-comment-body">' +
                                '<div class="reply-comment-header">' +
                                '<a href="/room/' + replyCommentData[j].userId + '" target="_blank">' + replyCommentData[j].userName +'</a>' +
                                '</div>' +
                                '<div class="reply-comment-content"><span class="reply-user">回复 <a href="/room/' + replyCommentData[j].replyUserId + '" target="_blank">' + replyCommentData[j].replyUserName + ' : </a></span>' + replyCommentData[j].content +
                                '</div>' +
                                '<div class="reply-comment-foot">' +
                                '<span class="reply-time"><i class="fa fa-clock-o" aria-hidden="true"></i>' + replyCommentData[j].time + '</span>' +
                                '<a href="javascript:;" class="reply-reply" onclick="replyComment(\'' + rowData[i].id + '\',\'' + replyCommentData[j].userId +'\',this)"><i class="fa fa-reply" aria-hidden="true"></i>回复</a>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</li>'
                            )
                        }else{
                            $(".reply-list" + i + " ul.reply-list-box").append('<li class="reply-comment-item">' +
                                '<div class="reply-comment-item-area">' +
                                '<div class="reply-userPhoto"><img src="' + replyUserPhoto + '"></div>' +
                                '<div class="reply-comment-body">' +
                                '<div class="reply-comment-header">' +
                                '<a href="/room/' + replyCommentData[j].userId + '" target="_blank">' + replyCommentData[j].userName +'</a>' +
                                '</div>' +
                                '<div class="reply-comment-content">' + replyCommentData[j].content +
                                '</div>' +
                                '<div class="reply-comment-foot">' +
                                '<span class="reply-time"><i class="fa fa-clock-o" aria-hidden="true"></i>' + replyCommentData[j].time + '</span>' +
                                '<a href="javascript:;" class="reply-reply" onclick="replyComment(\'' + rowData[i].id + '\',\'' + replyCommentData[j].userId +'\',this)"><i class="fa fa-reply" aria-hidden="true"></i>回复</a>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</li>'
                            )
                        }
                    }
                    var k = i;
                    $(".reply-list" + i + " ul.reply-list-box").append('<div id="replyCommentPage' + k + '" style="margin-left: 314px;"></div>');
                    var commentId = rowData[i].id;

                    showReplyCommentPage(replyData.pager.recordCount,replyData.pager.pageIndex,commentId,k);
                }
            }
            showCommentPage(data.body.pager.recordCount,data.body.pager.pageIndex,sort);
        }
    })
}

//分页
function showCommentPage(count,pageIndex,sort){
    layui.use(['laypage'], function(){
        var laypage = layui.laypage;

        //完整功能
        laypage.render({
            elem: 'commentPage',
            count: count,
            theme: '#53e8b8',
            curr : pageIndex,
            jump: function(obj,first){
                if(!first){
                    queryComment(obj.curr,sort);
                }
            }
        });
    });
}

function queryReplyComment(pageIndex,id,i){
    $.ajax({
        url: "/back/commentServices/pageReplyCommentInfo",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
            "commentId": id,
            "pageIndex": pageIndex

        }),
        success: function (replyData) {
            $(".reply-list" + i + " ul.reply-list-box").empty();
            var replyCommentData = replyData.body.data;
            for(var j=0; j<replyCommentData.length; j++){
                var replyUserPhoto = replyCommentData[j].userPhoto?(uploadUrl+replyCommentData[j].userPhoto):'/static/img/logo.png';
                if(replyCommentData[j].replyUserId){
                    $(".reply-list" + i + " ul.reply-list-box").append('<li class="reply-comment-item">' +
                        '<div class="reply-comment-item-area">' +
                        '<div class="reply-userPhoto"><img src="' + replyUserPhoto + '"></div>' +
                        '<div class="reply-comment-body">' +
                        '<div class="reply-comment-header">' +
                        '<a href="/room/' + replyCommentData[j].userId + '" target="_blank">' + replyCommentData[j].userName +'</a>' +
                        '</div>' +
                        '<div class="reply-comment-content"><span class="reply-user">回复 <a href="/room/' + replyCommentData[j].replyUserId + '" target="_blank">' + replyCommentData[j].replyUserName + ' : </a></span>' + replyCommentData[j].content +
                        '</div>' +
                        '<div class="reply-comment-foot">' +
                        '<span class="reply-time"><i class="fa fa-clock-o" aria-hidden="true"></i>' + replyCommentData[j].time + '</span>' +
                        '<a href="javascript:;" class="reply-reply" onclick="replyComment(\'' + id + '\',\'' + replyCommentData[j].userId +'\',this)"><i class="fa fa-reply" aria-hidden="true"></i>回复</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</li>'
                    )
                }else{
                    $(".reply-list" + i + " ul.reply-list-box").append('<li class="reply-comment-item">' +
                        '<div class="reply-comment-item-area">' +
                        '<div class="reply-userPhoto"><img src="' + replyUserPhoto + '"></div>' +
                        '<div class="reply-comment-body">' +
                        '<div class="reply-comment-header">' +
                        '<a href="/room/' + replyCommentData[j].userId + '" target="_blank">' + replyCommentData[j].userName +'</a>' +
                        '</div>' +
                        '<div class="reply-comment-content">' + replyCommentData[j].content +
                        '</div>' +
                        '<div class="reply-comment-foot">' +
                        '<span class="reply-time"><i class="fa fa-clock-o" aria-hidden="true"></i>' + replyCommentData[j].time + '</span>' +
                        '<a href="javascript:;" class="reply-reply" onclick="replyComment(\'' + id + '\',\'' + replyCommentData[j].userId +'\',this)"><i class="fa fa-reply" aria-hidden="true"></i>回复</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</li>'
                    )
                }
            }
            $(".reply-list" + i + " ul.reply-list-box").append('<div id="replyCommentPage' + i + '" style="margin-left: 314px;"></div>');
            showReplyCommentPage(replyData.body.pager.recordCount,replyData.body.pager.pageIndex,id,i);
        }
    })
}



function showReplyCommentPage(count,pageIndex,id,i){
    layui.use(['laypage'], function(){
        var laypage = layui.laypage;

        //完整功能
        laypage.render({
            elem: 'replyCommentPage'+i,
            count: count,
            theme: '#53e8b8',
            limit: 5,
            curr : pageIndex,
            jump: function(obj,first){
                if(!first){
                    queryReplyComment(obj.curr,id,i);
                }
            }
        });
    });
}

//判断是否有用户信息做不同的操作
function createCommentHtml(){
    if(localStorage.getItem('token')){
        $(".comment-create form").html('<div class="layui-form-item layui-form-text">' +
            '<div class="layui-input-inline">' +
            '<textarea placeholder="请输入内容" name="comment" class="layui-textarea"></textarea>' +
            '<button type="button" id="createComment" class="layui-btn">发送</button>' +
            '</div>' +
            '</div>'
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
                        "blogId": blogId

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
                                $(window).attr('location', url);
                            },2500)
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
            '<div class="layui-input-inline">' +
            '<textarea placeholder="你未登录,无法评论,请登录!" class="layui-textarea" readonly=""></textarea>' +
            '<button type="button" class="layui-btn layui-btn-disabled">发送</button>' +
            '</div>' +
            '</div>'
        )
    }
}

function replyCommentFirst(id,obj){
    if($(obj).parent().parent().parent().parent().find(".createReplyClass").html() == ""){

        if(localStorage.getItem('token')){
            $(obj).parent().parent().parent().parent().find(".createReplyClass").html('<div class="layui-form-item layui-form-text">' +
                '<div class="layui-input-inline">' +
                '<textarea placeholder="请输入内容" name="replyCommentFirst" class="layui-textarea"></textarea>' +
                '<button type="button" id="createReplyCommentFirst" class="layui-btn">发送</button>' +
                '</div>' +
                '</div>'
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
                            "replyUserId": "",
                            "blogId": blogId

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
            $(obj).parent().parent().parent().parent().find(".createReplyClass").html('<div class="layui-form-item layui-form-text">' +
                '<div class="layui-input-inline">' +
                '<textarea placeholder="你未登录,无法评论,请登录!" class="layui-textarea" readonly=""></textarea>' +
                '<button type="button" class="layui-btn layui-btn-disabled">发送</button>' +
                '</div>' +
                '</div>'
            )
        }

    }else{
        $(obj).parent().parent().parent().parent().find(".createReplyClass").html("")
    }
}

function replyComment(id,userId,obj){

    if($(obj).parent().parent().parent().parent().parent().parent().parent().find(".createReplyClass").html() == ""){

        if(localStorage.getItem('token')){
            $(obj).parent().parent().parent().parent().parent().parent().parent().find(".createReplyClass").html('<div class="layui-form-item layui-form-text">' +
                '<div class="layui-input-inline">' +
                '<textarea placeholder="请输入内容" name="replyComment" class="layui-textarea"></textarea>' +
                '<button type="button" id="createReplyComment" class="layui-btn">发送</button>' +
                '</div>' +
                '</div>'
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
                            "replyUserId": userId,
                            "blogId": blogId

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
            $(obj).parent().parent().parent().parent().parent().parent().parent().find(".createReplyClass").html('<div class="layui-form-item layui-form-text">' +
                '<div class="layui-input-inline">' +
                '<textarea placeholder="你未登录,无法评论,请登录!" class="layui-textarea" readonly=""></textarea>' +
                '<button type="button" class="layui-btn layui-btn-disabled">发送</button>' +
                '</div>' +
                '</div>'
            )
        }

    }else{
        $(obj).parent().parent().parent().parent().parent().parent().parent().find(".createReplyClass").html("")
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
                "blogId": blogId

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
                    alertmsgFtm("收藏成功");

                    $(".collectionIcon").html("<a href='javascript:;' onclick='loseCollection();'><i class=\"fa fa-heart\" aria-hidden=\"true\"></i>已收藏</a>");
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
                "blogId": blogId

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
                    alertmsgFtm("取消收藏成功");

                    $(".collectionIcon").html("<a href='javascript:;' onclick='toCollection();'><i class=\"fa fa-heart-o\" aria-hidden=\"true\"></i>收藏</a>");
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
                "id": id

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
                    alertmsgFtm("点赞成功");

                    $(obj).parent().html('<a href="javascript:;" onclick="losePraise(\'' + id + '\',' + i +',this)"><i class="fa fa-thumbs-up" aria-hidden="true"></i>已赞</a>')
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
                "id": id
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
                    alertmsgFtm("取消点赞成功");

                    $(obj).parent().html('<a href="javascript:;" onclick="toPraise(\'' + id + '\',' + i +',this)"><i class="fa fa-thumbs-o-up" aria-hidden="true"></i>赞</a>')
                    $(".praiseCount"+i).text(Number($(".praiseCount"+i).text()) -1)
                }else{
                    alertmsgFtm("操作失败,请稍后再试")
                }

            }
        })
    }

}