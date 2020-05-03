if(checkLogin() != "ok"){

}else{
    var goodsCount = 0;
    $.ajax({
        url: "/back/userServices/pageUserInfo",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify({"loginId": localStorage.getItem("loginId")}),
        success: function (data) {
            var rowData = data.body.data[0];

            if(rowData.loginId != localStorage.getItem("loginId")){
                $(window).attr('location', '/404')
            }else{
                $(".shopCar-top .addressArea .address-name").text('收货人姓名:'+rowData.addressName)
                $(".shopCar-top .addressArea .address-phone").text('收货人手机:'+rowData.addressPhone)
                $(".shopCar-top .addressArea .address-info").text('收货人地址:'+rowData.address)

            }
        }
    })

    $.ajax({
        url: "/back/shopServices/listShopCarInfo",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify({}),
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Authorization", "ym:" + localStorage.getItem('token'));
        },
        error: function(xhr){
            errorLogin($.parseJSON(xhr.responseText));
            return false;
        },
        success: function (data) {
            var rowData = data.body;

            var shopCarPriceCount = 0.00;
            goodsCount = rowData.length;
            for(var i=0; i<rowData.length; i++){
                $("#shopCarTable tbody").append('<tr>' +
                    '<td>'+ rowData[i].goodsName + '</td>' +
                    '<td>￥<span id="price' + i + '">' + rowData[i].price + '</span></td>' +
                    '<td class="shopCar-opera">' +
                    '<button type="button" onclick="subShop(\'' + rowData[i].goodsId + '\',' + i +');">-</button>' + '<input id="goodsNums' + i + '" value="' + rowData[i].nums + '"><button type="button" onclick="addShop(\'' + rowData[i].goodsId + '\',' + i + ');">+</button>' +
                    '</td>' +
                    '<td>￥<span id="priceCount' + i + '">' + rowData[i].priceCount + '</span></td>' +
                    '<td><button type="button" class="layui-btn layui-btn-danger" onclick="deleteShop(\'' + rowData[i].goodsId + '\')">删除</button></td>' +
                    '</tr>'
                )


                shopCarPriceCount += Number(rowData[i].priceCount);

            }
            $(".shopCar-content .shopCarPriceCount input").val("￥"+(shopCarPriceCount.toFixed(2)))

        }
    })
}

function deleteShop(id) {
    $.ajax({
        url: "/back/shopServices/deleteShopCar",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify({
            "goodsId":id
        }),
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Authorization", "ym:" + localStorage.getItem('token'));
        },
        error: function(xhr){
            errorLogin($.parseJSON(xhr.responseText));
            return false;
        },
        success: function (data) {
            if(data.body == 'success'){
                alertmsgTm("删除成功");
                setTimeout(function () {
                    $(window).attr('location', '/shopCar')
                }, 2000);
            }else{
                alertmsgFtmIndex("删除失败,请稍后再试");
            }

        }
    })
}

function addShop(id,i) {
    $.ajax({
        url: "/back/shopServices/updateShopCarInfo",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify({
            "goodsId":id,
            "add":"1"
        }),
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Authorization", "ym:" + localStorage.getItem('token'));
        },
        error: function(xhr){
            errorLogin($.parseJSON(xhr.responseText));
            return false;
        },
        success: function (data) {
            if(data.body == 'success'){
                var nums = Number($("#goodsNums"+i).val())+1;
                $("#goodsNums"+i).val(nums)
                $("#priceCount"+i).text((Number($("#price"+i).text())*nums).toFixed(2))
                setShopCarPriceCount();
            }else{
                alertmsgFtmIndex("操作失败,请稍后再试");
            }

        }
    })
}

function subShop(id,i) {
    $.ajax({
        url: "/back/shopServices/updateShopCarInfo",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify({
            "goodsId":id,
            "sub":"1"
        }),
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Authorization", "ym:" + localStorage.getItem('token'));
        },
        error: function(xhr){
            errorLogin($.parseJSON(xhr.responseText));
            return false;
        },
        success: function (data) {
            if(data.body == 'success'){
                var nums = Number($("#goodsNums"+i).val())-1;
                if(nums == 0){
                    return;
                }
                $("#goodsNums"+i).val(nums);
                $("#priceCount"+i).text((Number($("#price"+i).text())*nums).toFixed(2));
                setShopCarPriceCount();
            }else{
                alertmsgFtmIndex("操作失败,请稍后再试");
            }

        }
    })
}

function setShopCarPriceCount() {
    var price = 0.00;
    for(var i=0; i<goodsCount; i++){
        price += Number($("#priceCount"+i).text());
    }
    $(".shopCar-content .shopCarPriceCount input").val("￥"+(price.toFixed(2)))
}

function buy() {
    $.ajax({
        url: "/back/shopServices/checkShopCar",
        contentType: "application/json",
        type: "post",
        data: JSON.stringify({}),
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Authorization", "ym:" + localStorage.getItem('token'));
        },
        error: function(xhr){
            errorLogin($.parseJSON(xhr.responseText));
            return false;
        },
        success: function (data) {
            if(data.body == 'success'){
                $(window).attr('location', '/alipay')
            }else{
                alertmsgFtmIndex("购买失败,某些商品库存不足");
            }
        }
    })
}