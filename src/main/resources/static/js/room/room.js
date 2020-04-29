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
            $(".room-user .room-name .value").text(rowData.name)
            $(".room-user .room-sex .value").text(rowData.sex)

            if(rowData.enable == "0"){
                $(".room-user .room-enable .value").text("该账号被封禁")
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
                $(".main .list").empty();

                for(var i=0; i<rowData.length; i++){
                    var cover = rowData[i].cover ? (uploadUrl + rowData[i].cover) : '/static/img/logo.png';
                    var blogType = rowData[i].type == "0" ? "原创" : "转载";

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
                        '<span class="columnName"><i></i><span>' + rowData[i].columnName + '</span></span>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    )



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
            data: JSON.stringify({"userId": userId,"pageIndex":pageIndex,"enable":"1"}),
            success: function (data) {
                var rowData = data.body.data;
                $(".main .list").empty();

                for(var i=0; i<rowData.length; i++){
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
