// initRouter();
// function initRouter() {
//     var url = window.location.href;
//     var router;
//     if (url.indexOf("#/") > -1) {
//         router = url.substring(url.indexOf('#/') + 2);
//         if (router === '') {
//             router = 'home.html';
//         }
//         // $('#iframeParent').attr('src', 'page/' + router + '.html');
//         $('#iframeParent').attr('src', router + '.html');
//
//     } else {
//         // $('#iframeParent').attr('src', 'page/home.html');
//         $('#iframeParent').attr('src', 'home.html');
//         history.replaceState(null, null, '#/');
//     }
//     //地址栏修改不刷新的解决方案
//     $('a').click(function () {
//         if ($(this).attr('href')) {
//             window.location.href = $(this).attr('href');
//             window.location.reload();
//         }
//     });
// }
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
                        '<a href="article/' +rowData[i].blogId + '" target="_blank"><img src="' + uploadUrl + rowData[i].cover + '"></a>'
                        + '<div class="titleBack"><span class="title">' + rowData[i].title + '</span></div>' + '</div>'
                    )
                }else{
                    $(".rotation-list").append('<div>' +
                        '<a href="article/' +rowData[i].blogId + '" target="_blank"><img src="/static/img/blogPhoto.jpg"></a>'
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

    $.ajax({
        url: "/back/blogServices/pageBlogInfoByNew",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify({"pageSize":15}),
        success: function (data) {
            var rowData = data.body.data;
            for(var i=0; i<rowData.length; i++){
                if(rowData[i].cover != null && rowData[i].cover != '' ) {
                    $(".new-article-list").append(
                        '<div class="new-article-item">' +
                            '<div class="new-article-content">' +
                                '<div class="new-article-cover">' +
                                    '<a href="/article/' + rowData[i].blogId +'" target="_blank">' +
                                        '<span>' + rowData[i].type +'</span><img src="'+ uploadUrl + rowData[i].cover + '">' +
                                    '</a>' +
                                '</div>' +
                                '<div class="new-article-body">' +
                                    '<h5 class="new-article-title">' +
                                        '<a href="/article/' + rowData[i].blogId +'"  target="_blank">' + rowData[i].title + '</a>' +
                                    '</h5>' +
                                    '<p class="new-article-descrption">' + rowData[i].content + '</p>' +
                                    '<div class="new-article-meta">' +
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
                }else{
                    $(".new-article-list").append(
                    '<div class="new-article-item">' +
                        '<div class="new-article-content">' +
                            '<div class="new-article-cover">' +
                                '<a href="/article/' + rowData[i].blogId +'" target="_blank">' +
                                    '<span>' + rowData[i].type +'</span><img src="/static/img/logo.png">' +
                                '</a>' +
                            '</div>' +
                            '<div class="new-article-body">' +
                                '<h5 class="new-article-title">' +
                                    '<a href="/article/' + rowData[i].blogId +'" target="_blank">' + rowData[i].title + '</a>' +
                                '</h5>' +
                                '<p class="new-article-descrption">' + rowData[i].content + '</p>' +
                                '<div class="new-article-meta">' +
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
        }
    })

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

