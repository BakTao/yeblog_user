if(checkLogin() != "ok"){

}else{
    queryOrder(1);
}

function queryOrder(pageIndex) {
    $.ajax({
        url: "/back/orderServices/pageOrderInfo",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify({
            "pageIndex":pageIndex
        }),
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Authorization", "ym:" + localStorage.getItem('token'));
        },
        error: function(xhr){
            errorLogin($.parseJSON(xhr.responseText));
            return false;
        },
        success: function (data) {
            var rowData = data.body.data;
            $("#orderTable tbody").empty();

            for(var i=0; i<rowData.length; i++){
                if(rowData[i].enable == "0"){
                    $("#orderTable tbody").append('<tr>' +
                        '<td>'+ rowData[i].orderId + '</td>' +
                        '<td>￥' + rowData[i].price + '</td>' +
                        '<td>已关闭</td>' +
                        '<td>' + rowData[i].createTime + '</td>' +
                        '<td>' +
                        '<button type="button" onclick="showOrder(\'' + rowData[i] .orderId+ '\')">查看</button>' +
                        '</td>' +
                        '</tr>'
                    )
                }else if(rowData[i].enable == "1"){
                    $("#orderTable tbody").append('<tr>' +
                        '<td>'+ rowData[i].orderId + '</td>' +
                        '<td>￥' + rowData[i].price + '</td>' +
                        '<td>待发货</td>' +
                        '<td>' + rowData[i].createTime + '</td>' +
                        '<td>' +
                        '<button type="button" onclick="showOrder(\'' + rowData[i] .orderId+ '\')">查看</button>' +
                        '<button type="button" onclick="updateOrder(\'' + rowData[i].orderId + '\',\'0\')">取消订单</button>' +
                        '</td>' +
                        '</tr>'
                    )
                }else if(rowData[i].enable == "2"){
                    $("#orderTable tbody").append('<tr>' +
                        '<td>'+ rowData[i].orderId + '</td>' +
                        '<td>￥' + rowData[i].price + '</td>' +
                        '<td>待收货</td>' +
                        '<td>' + rowData[i].createTime + '</td>' +
                        '<td>' +
                        '<button type="button" onclick="showOrder(\'' + rowData[i] .orderId+ '\')">查看</button>' +
                        '<button type="button" onclick="updateOrder(\'' + rowData[i].orderId + '\',\'3\')">完成订单</button>' +
                        '</td>' +
                        '</tr>'
                    )
                }else if(rowData[i].enable == "3"){
                    $("#orderTable tbody").append('<tr>' +
                        '<td>'+ rowData[i].orderId + '</td>' +
                        '<td>￥' + rowData[i].price + '</td>' +
                        '<td>已完成</td>' +
                        '<td>' + rowData[i].createTime + '</td>' +
                        '<td>' +
                        '<button type="button" onclick="showOrder(\'' + rowData[i] .orderId+ '\')">查看</button>' +
                        '</td>' +
                        '</tr>'
                    )
                }

            }
            showShopPage(data.body.pager.recordCount,data.body.pager.pageIndex);
        }
    })
}


//分页
function showShopPage(count,pageIndex){
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
                    queryOrder(obj.curr);
                }
            }
        });
    });
}


function showOrder(id) {
    $(window).attr('location', '/order/' + id)
}

function updateOrder(id,enable) {
    layui.use(['layer','form'], function () {
        var layer = layui.layer;
        layer.open({
            offset: 'auto'
            , content: '<p>是否确认?</p>'
            , btn: ['确认', '关闭']
            , btnAlign: 'c'
            , yes: function () {
                $.ajax({
                    url: "/back/orderServices/updateOrderInfo",
                    contentType: "application/json",
                    type: "post",
                    data: JSON.stringify({"orderId": id, "enable": enable}),
                    success: function (data) {
                        if (data.body == 'success') {
                            alertmsgFtm("操作成功");
                            setTimeout(function () {
                                $(window).attr('location', '/order')
                            }, 2000);
                        } else {
                            alertmsgFtmIndex("操作失败,请稍后再试");
                        }
                    }
                })
            }
        });
    })



}