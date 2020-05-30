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
                        '<td class="enable0">已关闭</td>' +
                        '<td>' + rowData[i].createTime + '</td>' +
                        '<td>' +
                        '<button type="button" class="layui-btn layui-btn-primary" onclick="showOrder(\'' + rowData[i] .orderId+ '\')">查看</button>' +
                        '</td>' +
                        '</tr>'
                    )
                }else if(rowData[i].enable == "1"){
                    $("#orderTable tbody").append('<tr>' +
                        '<td>'+ rowData[i].orderId + '</td>' +
                        '<td>￥' + rowData[i].price + '</td>' +
                        '<td class="enable1">待发货</td>' +
                        '<td>' + rowData[i].createTime + '</td>' +
                        '<td>' +
                        '<button type="button" class="layui-btn layui-btn-primary" onclick="showOrder(\'' + rowData[i] .orderId+ '\')">查看</button>' +
                        '<button type="button" class="layui-btn layui-btn-danger" onclick="updateOrder(\'' + rowData[i].orderId + '\',\'0\')">取消订单</button>' +
                        '</td>' +
                        '</tr>'
                    )
                }else if(rowData[i].enable == "2"){
                    $("#orderTable tbody").append('<tr>' +
                        '<td>'+ rowData[i].orderId + '</td>' +
                        '<td>￥' + rowData[i].price + '</td>' +
                        '<td class="enable2">待收货</td>' +
                        '<td>' + rowData[i].createTime + '</td>' +
                        '<td>' +
                        '<button type="button" class="layui-btn layui-btn-primary" onclick="showOrder(\'' + rowData[i] .orderId+ '\')">查看</button>' +
                        '<button type="button" class="layui-btn layui-btn-normal" onclick="updateOrder(\'' + rowData[i].orderId + '\',\'3\')">完成订单</button>' +
                        '</td>' +
                        '</tr>'
                    )
                }else if(rowData[i].enable == "3"){
                    $("#orderTable tbody").append('<tr>' +
                        '<td>'+ rowData[i].orderId + '</td>' +
                        '<td>￥' + rowData[i].price + '</td>' +
                        '<td class="enable3">已完成</td>' +
                        '<td>' + rowData[i].createTime + '</td>' +
                        '<td>' +
                        '<button type="button" class="layui-btn layui-btn-primary" onclick="showOrder(\'' + rowData[i] .orderId+ '\')">查看</button>' +
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
            elem: 'columnPage',
            count: count,
            theme: '#53e8b8',
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
                if(enable == "0"){
                    $.ajax({
                        url: "/refund",
                        contentType: "application/json",
                        type: "post",
                        data: JSON.stringify({"orderId": id, "enable": enable}),
                        success: function (data) {

                            alertmsgFtm("操作成功");
                            setTimeout(function () {
                                $(window).attr('location', '/order')
                            }, 2000);
                        }
                    })
                } else{
                    $.ajax({
                        url: "/back/orderServices/updateOrderInfo",
                        contentType: "application/json",
                        type: "post",
                        data: JSON.stringify({"orderId": id, "enable": enable}),
                        success: function (data) {

                            alertmsgFtm("操作成功");
                            setTimeout(function () {
                                $(window).attr('location', '/order')
                            }, 2000);
                        }
                    })
                }
            }
        });
    })



}