layui.use(['form'], function () {
    var form = layui.form;
    form.render();


    var url = window.location.href
    var columnId = url.substr(url.lastIndexOf("/")+1) == "all"?"":url.substr(url.lastIndexOf("/")+1);

    queryBlog({"title":"","blogOrder":"0"},1,columnId);

    $("#queryBtn").on("click",function () {
        var data = form.val('blogQueryForm');
        queryBlog(data,1,columnId);

    })

})

function queryBlog(queryData,pageIndex,columnId) {
    $.ajax({
        url: "/back/blogServices/pageBlogInfo",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
            "title": queryData.title,
            "columnId": columnId,
            "enable": "1",
            "type": "0,1",
            "blogOrder": queryData.blogOrder,
            "pageIndex": pageIndex

        }),
        success: function (data) {
            var rowData = data.body.data;
            $(".main .blog-list ul").empty();

            for(var i=0; i<rowData.length; i++){
                var cover = rowData[i].cover ? (uploadUrl + rowData[i].cover) : '/static/img/logo.png';
                var type = rowData[i].type == "0" ? "原创" : "转载";
                var typeClass = rowData[i].type == "0"? "own" : "noOwn";

                var str = rowData[i].content;  //html文字字符串
                var con = str.replace(/\s*/g, "");  //去掉空格
                var content =con.replace(/<[^>]+>/g, ""); //去掉所有的html标记

                $(".main .blog-list ul").append(
                    '<div class="article-item">' +
                    '<div class="article-content">' +
                    '<div class="article-cover">' +
                    '<a href="/article/' + rowData[i].blogId +'" target="_blank">' +
                    '<span class=' + typeClass + '>' + type +'</span><img src="'+ cover + '">' +
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
            showBlogPage(queryData,data.body.pager.recordCount,data.body.pager.pageIndex,columnId);
        }
    })
}


//分页
function showBlogPage(queryData,count,pageIndex,columnId){
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
                    queryBlog(queryData,obj.curr,columnId);
                }
            }
        });
    });
}