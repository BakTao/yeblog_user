var url = window.location.href;
var userId = url.substr(url.lastIndexOf("/")+1);

$.ajax({
    url: "/back/userServices/pageUserInfo",
    contentType: "application/json",
    type: "post",
    data: JSON.stringify({"loginId": userId,"blogEnable":"1","blogType":"0,1"}),
    success: function (data) {
        if(data.body.data.length == 0){
            $(window).attr('location', '/404');
        }else{
            var rowData = data.body.data[0];
            var userPhoto = rowData.userPhoto ? (uploadUrl + rowData.userPhoto) : '/static/img/logo.png';

            $(".room-count .blogCount .avalue").text(rowData.blogCountHj + "篇")
            $(".room-count .blogCollCount .avalue").text(rowData.collectionNums + "篇")
            $(".room-user .room-photo").attr("src", userPhoto)
            $(".room-user .room-name .value").append(rowData.name)
            $(".room-user .room-sex .value").append(rowData.sex)

            if(rowData.enable == "0"){
                $(".room-user .room-enable .value").append('<i class="fa fa-hourglass-o" aria-hidden="true">该账号被封禁</i>')
            }
        }
    }
})

function getBCData(type,pageIndex){

    if(type == "blog"){
        $.ajax({
            url: "/back/blogServices/pageBlogInfo",
            contentType: "application/json",
            type: "post",
            data: JSON.stringify({"userId": userId,"pageIndex":pageIndex,"enable":"1","type":"0,1"}),
            success: function (data) {
                var rowData = data.body.data;
                $(".main .room-list").empty();

                for(var i=0; i<rowData.length; i++){
                    var cover = rowData[i].cover ? (uploadUrl + rowData[i].cover) : '/static/img/logo.png';
                    var blogType = rowData[i].type == "0" ? "原创" : "转载";
                    var typeClass = rowData[i].type == "0"? "own" : "noOwn";

                    var str = rowData[i].content;  //html文字字符串
                    var con = str.replace(/\s*/g, "");  //去掉空格
                    var content =con.replace(/<[^>]+>/g, ""); //去掉所有的html标记

                    $(".main .room-list").append(
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
                        '</div>'
                    )
                }
                $(".main .room-list").append('<div id="columnPage"></div>')
                showPage(type,data.body.pager.recordCount,data.body.pager.pageIndex);
            }
        })
    }else if(type == "collBlog"){
        $.ajax({
            url: "/back/blogServices/pageCollectionBlog",
            contentType: "application/json",
            type: "post",
            data: JSON.stringify({"userId": userId,"pageIndex":pageIndex,"enable":"1"}),
            success: function (data) {
                var rowData = data.body.data;
                $(".main .room-list").empty();

                for(var i=0; i<rowData.length; i++){
                    var cover = rowData[i].cover ? (uploadUrl + rowData[i].cover) : '/static/img/logo.png';
                    var blogType = rowData[i].type == "0" ? "原创" : "转载";
                    var typeClass = rowData[i].type == "0"? "own" : "noOwn";

                    var str = rowData[i].content;  //html文字字符串
                    var con = str.replace(/\s*/g, "");  //去掉空格
                    var content =con.replace(/<[^>]+>/g, ""); //去掉所有的html标记

                    $(".main .room-list").append(
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
                        '</div>'
                    )
                }
                $(".main .room-list").append('<div id="columnPage"></div>')
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
