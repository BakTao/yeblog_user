layui.use(['table', 'form'], function () {
    var form = layui.form;

    form.render();

    //为查询类别赋值
    var categorySelect = xmSelect.render({
        el: '#category',
        filterable: true,
        paging: true,
        pageSize: 5,
        name: 'categoryId',
        data: []
    })

    $.ajax({
        url: "/back/shopServices/listCategoryInfo",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({}),
        success: function (data) {
            categorySelect.update({ "data": data.body });
        }
    })

    queryShop({"goodsName":"","shopOrder":"0","categoryId":""},1);

    $("#queryBtn").on("click",function () {
        var data = form.val('shopQueryForm');
        queryShop(data,1);

    })
});


function queryShop(queryData,pageIndex) {
    $.ajax({
        url: "/back/shopServices/pageShopInfo",
        type: "post",
        contentType: "application/json",
        data: JSON.stringify({
            "goodsName": queryData.goodsName,
            "categoryId": queryData.categoryId,
            "shopOrder": queryData.shopOrder,
            "pageIndex": pageIndex

        }),
        success: function (data) {
            var rowData = data.body.data;
            $(".main .shop-list .shop-area").empty();

            for(var i=0; i<rowData.length; i++){
                var cover = rowData[i].photo ? (uploadUrl + rowData[i].photo) : '/static/img/logo.png';
                var shopType = rowData[i].type == "0" ? "实物" : "电子";

                $(".main .shop-list .shop-area").append(
                    '<div class="shop-item">' +
                    '<div class="shop-top">' +
                    '<div class="shop-photo">' +
                    '<img src="'+ cover +'"></div>' +
                    '<div class="category"><span>' + rowData[i].categoryName + '</span></div>' +
                    '<div class="shopType"><span>' + shopType + '</span></div>' +
                    '<div class="shop-addCar">' +
                    '<button onclick="addShopCar(\'' + rowData[i].goodsId + '\');"><i class="fa fa-shopping-cart" aria-hidden="true"></i></button></div>' +
                    '</div>' +
                    '<div class="bottom">' +
                    '<div class="shop-name">' + rowData[i].goodsName + '</div>' +
                    '<div class="shop-content">' + rowData[i].content + '</div>' +
                    '<div class="shop-nums">' +
                    '<span class="shop-leftNums">剩余数量:' + rowData[i].leftNums + '</span>' +
                    '<span class="shop-buyNums">销量:' + rowData[i].buyNums + '</span>' +
                    '<span class="shop-price">价格:￥' + rowData[i].price + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                )
            }
            showShopPage(queryData,data.body.pager.recordCount,data.body.pager.pageIndex);
        }
    })
}


//分页
function showShopPage(queryData,count,pageIndex){
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
                    queryShop(queryData,obj.curr);
                }
            }
        });
    });
}

function updateAddress() {
    if(checkLogin() != "ok"){

    }else{
        layui.use(['layer','form'], function () {
            var layer = layui.layer;
            var form = layui.form;

            $.ajax({
                url: "/back/userServices/pageUserInfo",
                contentType: "application/json",
                type: "post",
                data: JSON.stringify({"loginId": localStorage.getItem("loginId")}),
                success: function (data) {
                    var rowData = data.body.data[0];

                    form.val('AddressInfoForm', {
                        "addName": rowData.addressName
                        , "addPhone": rowData.addressPhone
                        , "address": rowData.address
                    });
                }
            })



            layer.open({
                type: 1
                , area: ['30%', '45%']
                , offset: 'auto'
                , content: $("#AddressInfo")
                , btn: ['更新','关闭']
                , btnAlign: 'c'
                , yes: function () {
                    $.ajax({
                        url: "/back/userServices/updateUserInfo",
                        contentType: "application/json",
                        type: "post",
                        data: JSON.stringify({
                            "addressName":$("input[name=addName]").val()
                            ,"addressPhone":$("input[name=addPhone]").val()
                            ,"address":$("input[name=address]").val()
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
                                alertmsgFtm("更新成功");
                                setTimeout(function () {
                                    $(window).attr('location', '/shop')
                                }, 2000);
                            }else{
                                alertmsgFtmIndex("更新失败,请稍后再试");
                            }
                        }
                    })
                }
            });

        })
    }
}

function order() {
    $(window).attr('location', '/order')
}

function shopCar() {
    $(window).attr('location', '/shopCar')
}

function addShopCar(id) {
    $.ajax({
        url: "/back/shopServices/createShopCar",
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
                alertmsgTm("添加成功");
            }else{
                alertmsgFtmIndex("添加失败,请稍后再试");
            }
        }
    })
}