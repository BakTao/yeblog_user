var url = window.location.href
var orderId = url.substr(url.lastIndexOf("/")+1);

if(checkLogin() != "ok"){

}else{
    $.ajax({
        url: "/back/orderServices/pageOrderInfo",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify({
            "orderId":orderId
        }),
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Authorization", "ym:" + localStorage.getItem('token'));
        },
        error: function(xhr){
            errorLogin($.parseJSON(xhr.responseText));
            return false;
        },
        success: function (data) {
            var rowData = data.body.data[0];

            if(rowData.userId != localStorage.getItem("loginId")){
                $(window).attr('location', '/404')
            }else{
                $(".order-top .addressArea .address-name").text('收货人姓名:'+rowData.userName)
                $(".order-top .addressArea .address-phone").text('收货人手机:'+rowData.userPhone)
                $(".order-top .addressArea .address-info").text('收货人地址:'+rowData.address)

                if(rowData.enable == "2" || rowData.enable == "3"){
                    $(".order-bottom").append('<div class="order-express">' +
                        '物流编号:<input type="text" readonly="readonly" class="order-expressId" value="'+ rowData.expressId + '">' +
                        '</div>'
                    )
                }
                if(rowData.enable == "3"){
                    $.ajax({
                        url: "/back/orderServices/listOrderShopInfo",
                        contentType: "application/json",
                        type: "post",
                        data: JSON.stringify({"orderId":orderId,"enable":"3"}),
                        success: function (data) {
                            var rowData = data.body;

                            var orderPriceCount = 0.00;
                            $("#shopTable thead tr").append('<th>操作</th>')

                            for(var i=0; i<rowData.length; i++){
                                if(rowData[i].url){
                                    $("#shopTable tbody").append('<tr>' +
                                        '<td>'+ rowData[i].goodsName + '</td>' +
                                        '<td>￥' + rowData[i].price + '</td>' +
                                        '<td>' + rowData[i].nums + '</td>' +
                                        '<td>￥' + rowData[i].priceCount + '</td>' +
                                        '<td>' +
                                        '<a href="' + uploadUrl + rowData[i].url + '">下载</a> ' +
                                        '</td>' +
                                        '</tr>'
                                    )
                                    orderPriceCount += Number(rowData[i].priceCount);
                                }else{
                                    $("#shopTable tbody").append('<tr>' +
                                        '<td>'+ rowData[i].goodsName + '</td>' +
                                        '<td>￥' + rowData[i].price + '</td>' +
                                        '<td>' + rowData[i].nums + '</td>' +
                                        '<td>￥' + rowData[i].priceCount + '</td>' +
                                        '<td>' +
                                        '</td>' +
                                        '</tr>'
                                    )
                                    orderPriceCount += Number(rowData[i].priceCount);
                                }

                            }
                            $(".order-content .orderPriceCount input").val("￥"+(orderPriceCount.toFixed(2)))
                        }
                    })
                }else{
                    $.ajax({
                        url: "/back/orderServices/listOrderShopInfo",
                        contentType: "application/json",
                        type: "post",
                        data: JSON.stringify({"orderId":orderId}),
                        success: function (data) {
                            var rowData = data.body;

                            var orderPriceCount = 0.00;

                            for(var i=0; i<rowData.length; i++){
                                $("#shopTable tbody").append('<tr>' +
                                    '<td>'+ rowData[i].goodsName + '</td>' +
                                    '<td>￥' + rowData[i].price + '</td>' +
                                    '<td>' + rowData[i].nums + '</td>' +
                                    '<td>￥' + rowData[i].priceCount + '</td>' +
                                    '<td>' +
                                    '</td>' +
                                    '</tr>'
                                )
                                orderPriceCount += Number(rowData[i].priceCount);
                            }
                            $(".order-content .orderPriceCount input").val("￥"+(orderPriceCount.toFixed(2)))

                        }
                    })
                }

            }
        }
    })


}

function orderBack() {
    $(window).attr('location', '/order')
}