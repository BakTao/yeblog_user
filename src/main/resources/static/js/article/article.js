var url = window.location.href
queryComment(1);

//查询博客信息
$.ajax({
    url: "/back/blogServices/pageBlogInfo",
    contentType: "application/json",
    type: "post",
    data: JSON.stringify({"blogId":url.substr(url.lastIndexOf("/")+1)}),
    success: function (data) {
        var rowData = data.body.data[0];
        var url = rowData.cover?(uploadUrl+rowData.cover):'/static/img/logo.png';
        var type = (rowData.type == "0")?'原创':'转载';
        $(".detail-type span").text(type);
        $(".user span").text(rowData.userName);
        $(".date span").text(rowData.createTime);
        $(".viewNums span").text(rowData.viewNums);
        $(".detail-title h2").text(rowData.title);
        $("img.detail-cover").attr("src",url);
        $(".detail-content").append(rowData.content);
        $(".collectionIcon i").text("收藏");
        $(".collectionNums span").text(rowData.collectionNums);

        $(".detail-meta .date").text("本文发布于" + rowData.createTime);
        $(".detail-meta .viewNums").text(",被观看了" + rowData.viewNums);
        $(".userNamea").attr("href","prefile/" + rowData.userId);
        $(".userNamea").text(rowData.userName);
        $(".columnNamea").attr("href","/column/" + rowData.columnId);
        $(".columnNamea").text(rowData.columnName);

        $(".total strong").text(rowData.commentNums);
    }
})

//查询评论
function queryComment(pageIndex,pageSize){
    $.ajax({
        url: "/back/commentServices/pageCommentInfo",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify({"blogId":url.substr(url.lastIndexOf("/")+1),"sort":"time","pageIndex":pageIndex}),
        success: function (data) {
            $("ul.list-box").empty();
            var rowData = data.body.data;
            for(var i=0; i<rowData.length; i++){
                var userPhoto = rowData[i].userPhoto?(uploadUrl+rowData[i].userPhoto):'/static/img/logo.png';
                $(".comment-list ul.list-box").append('<li class="comment-item">' +
                    '<div class="userPhoto"><img src="' + userPhoto + '"></div>' +
                    '<div class="comment-body">' +
                    '<div class="comment-header">' +
                    '<a href="/prpfile/' + rowData[i].userId + '" target="_blank">' + rowData[i].userName +'</a>' +
                    '<span class="floor">' + rowData[i].rank +'</span> ' +
                    '</div>' +
                    '<div class="comment-content">' + rowData[i].content +
                    '</div>' +
                    '<div class="comment-foot">' +
                    '<span class="time">' + rowData[i].time + '</span>' +
                    '<a href class="reply"><i></i><span>回复</span></a>' +
                    '<a href class="like"><i></i><span>赞' + rowData[i].praiseNums + '</span></a>' +
                    '</div>' +
                    '</div>' +
                    '<div class="reply-list reply-list' + i + '"><ul class="reply-list-box"></ul></div>' +
                    '</li>'
                )
                var replyData = rowData[i].comments;

                if(replyData != null && replyData.length != 0){
                    for(var j=0; j<replyData.length; j++){
                        var replyUserPhoto = replyData[j].userPhoto?(uploadUrl+replyData[j].userPhoto):'/static/img/logo.png';
                        $(".reply-list" + i + " ul.reply-list-box").append('<li class="reply-comment-item">' +
                            '<div class="reply-userPhoto"><img src="' + replyUserPhoto + '"></div>' +
                            '<div class="reply-comment-body">' +
                            '<div class="reply-comment-header">' +
                            '<a href="prpfile/' + replyData[j].userId + '" target="_blank">' + replyData[j].userName +'</a>' +
                            '</div>' +
                            '<div class="reply-comment-content"><span class="reply-user">回复 <a href="/prpfile/' + replyData[j].replyUserId + '" target="_blank">' + replyData[j].replyUserName + ' : </a></span>' + replyData[j].content +
                            '</div>' +
                            '<div class="reply-comment-foot">' +
                            '<span class="reply-time">' + replyData[j].time + '</span>' +
                            '<a href class="reply-reply"><i></i><span>回复</span></a>' +
                            '</div>' +
                            '</div>' +
                            '</li>'
                        )
                    }
                }
            }
            showCommentPage(data.body.pager.recordCount,data.body.pager.pageIndex);
        }
    })
}

function showCommentPage(count,pageIndex){
    layui.use(['laypage'], function(){
        var laypage = layui.laypage;

        //完整功能
        laypage.render({
            elem: 'commentPage',
            count: count,
            theme: '#009587',
            limit : 1,
            curr : pageIndex,
            jump: function(obj,first){
                if(!first){
                    queryComment(obj.curr);
                }
            }
        });
    });
}