layui.use(['carousel', 'form'], function() {
    var carousel = layui.carousel;

    $.ajax({
        url: "/back/blogServices/pageBlogInfoByView",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify({"pageSize":6}),
        success: function (data) {
            var rowData = data.body.data;
            for(var i=0; i<rowData.length; i++){
                if(rowData[i].cover != null && rowData[i].cover != '' ){
                    $(".rotation-list").append('<div>' +
                        '<a href="article/' +rowData[i].blogId + '" target="_blank"><img class="rotation-img" src="' + uploadUrl + rowData[i].cover + '"></a>'
                        + '<div class="titleBack"><span class="title">' + rowData[i].title + '</span></div>' + '</div>'
                    )
                }else{
                    $(".rotation-list").append('<div>' +
                        '<a href="article/' +rowData[i].blogId + '" target="_blank"><img class="rotation-img" src="/static/img/blogPhoto.jpg"></a>'
                        + '<div class="titleBack"><span class="title">' + rowData[i].title + '</span></div>' + '</div>'
                    )
                }

            }

            carousel.render({
                elem: '#blogRotation'
                ,width: '590px'
                ,height: '200px'
                ,anim: 'fade'
                ,interval: 5000
            });
        }
    })

    queryBlogByNew(1);

    $.ajax({
        url: "/back/blogServices/pageBlogInfoByColl",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify({}),
        success: function (data) {
            var rowData = data.body.data;
            for(var i=0; i<rowData.length; i++){
                $(".rank-list ul").append('<li class="rank-item">' +
                    '<span class="index"></span>' +
                    '<a href="article/' + rowData[i].blogId + '" target="_blank">' + rowData[i].title + '</a>' +
                    '</li>'
                )
            }
        }
    })

});


//查询评论
function queryBlogByNew(pageIndex){
    $.ajax({
        url: "/back/blogServices/pageBlogInfoByNew",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify({"pageIndex":pageIndex}),
        success: function (data) {
            $(".new-article-list").empty();

            var rowData = data.body.data;
            for(var i=0; i<rowData.length; i++){
                var type = rowData[i].type == "0"? "原创" : "转载";
                var typeClass = rowData[i].type == "0"? "own" : "noOwn";
                var cover = rowData[i].cover?(uploadUrl+rowData[i].cover):'/static/img/logo.png';

                var str = rowData[i].content;  //html文字字符串
                var con = str.replace(/\s*/g, "");  //去掉空格
                var content =con.replace(/<[^>]+>/g, ""); //去掉所有的html标记

                $(".new-article-list").append(
                    '<div class="new-article-item">' +
                    '<div class="new-article-content">' +
                    '<div class="new-article-cover">' +
                    '<a href="/article/' + rowData[i].blogId +'" target="_blank">' +
                    '<span class=' + typeClass + '>' + type +'</span><img src="'+ cover + '">' +
                    '</a>' +
                    '</div>' +
                    '<div class="new-article-body">' +
                    '<div class="new-article-title">' +
                    '<div class="title"><a href="/article/' + rowData[i].blogId +'"  target="_blank">' + rowData[i].title + '</a></div>' +
                    '<div class="userName"><i class="fa fa-user-secret" aria-hidden="true"></i><a href="/room/'+ rowData[i].userId + '">' + rowData[i].userName + '</a></div>' +

                    '</div>' +

                    '<div class="new-article-descrption">' + content + '</div>' +
                    '<div class="new-article-meta">' +
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
            showBlogPage(data.body.pager.recordCount,data.body.pager.pageIndex);
        }
    })
}

//分页
function showBlogPage(count,pageIndex){
    layui.use(['laypage'], function(){
        var laypage = layui.laypage;

        //完整功能
        laypage.render({
            elem: 'page',
            count: count,
            theme: '#53e8b8',
            curr : pageIndex,
            jump: function(obj,first){
                if(!first){
                    queryBlogByNew(obj.curr);
                }
            }
        });
    });
}


