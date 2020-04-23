queryColumn(1);

$.ajax({
    url: "/back/columnServices/listBlogColumnInfoAll",
    contentType: "application/json",
    type: "post",
    data: JSON.stringify({

    }),
    success: function (data) {
        var rowData = data.body[0];
        $(".main .column-all").append(
            '<div>' +
            '<span class="columnRank">排名</span>' +
            '<span class="columnName">专栏名称</span>' +
            '<span class="blogCount">博客数</span>' +
            '</div>'+
            '<div>' +
            '<span class="columnName"><a href="/column/all">全部</a></span>' +
            '<span class="blogCount">' + rowData.blogCount + '</span>' +
            '</div>'
        )
    }
})

function queryColumn(pageIndex){
    $.ajax({
        url: "/back/columnServices/pageBlogColumnInfo",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify({
            "pageIndex": pageIndex
        }),
        success: function (data) {
            var rowData = data.body.data;
            $(".main .column-list").empty();
            for(var i=0; i<rowData.length; i++){
                $(".main .column-list").append('<li>' +
                    '<div>' +
                    '<span class="columnRank">' + rowData[i].rank + '</span>' +
                    '<span class="columnName"><a href="/column/' + rowData[i].columnId +'">' + rowData[i].columnName + '</a></span>' +
                    '<span class="blogCount">' + rowData[i].blogCount + '</span>' +
                    '</div>' +
                    '</li>'
                )
            }
            showColumnPage(data.body.pager.recordCount,data.body.pager.pageIndex);
        }
    })
}




//分页
function showColumnPage(count,pageIndex){
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
                    queryColumn(obj.curr);
                }
            }
        });
    });
}