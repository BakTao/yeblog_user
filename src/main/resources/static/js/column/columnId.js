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
                var blogType = rowData[i].type == "0" ? "原创" : "转载";

                $(".main .blog-list ul").append(
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
                    '<span class="columnName"><i></i><span>' + rowData[i].columnName + '</span></span>' +
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
            elem: 'page',
            count: count,
            theme: '#009587',
            curr : pageIndex,
            jump: function(obj,first){
                if(!first){
                    queryBlog(queryData,obj.curr,columnId);
                }
            }
        });
    });
}