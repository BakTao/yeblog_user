var uploadUrl = "http://169.254.211.25:9000"

function checkLogin() {
    if(!localStorage.getItem('token')){
        errorLogin({
            "status":602
        })
        return false;
    }

    $.ajax({
        type:"get",
        url:"/back/userLoginServices/checkLogin",
        beforeSend: function (XMLHttpRequest) {
            XMLHttpRequest.setRequestHeader("Authorization", "ym:" + localStorage.getItem('token'));
        },
        error: function(xhr){
            errorLogin($.parseJSON(xhr.responseText));
        },
        success: function(data){
            localStorage.setItem('loginId', data.body.loginId)
        }
    })
}

function previewImg(obj) {
    var img = new Image();
    img.src = obj.src;
    var height = img.height + 50; //获取图片高度
    var width = img.width; //获取图片宽度
    var imgHtml = "<img src='" + obj.src + "' />";
    //弹出层
    layui.layer.open({
        type: 1,
        shade: 0.8,
        offset: 'auto',
        area: [width + 'px',height+'px'],
        shadeClose:true,//点击外围关闭弹窗
        scrollbar: false,//不现实滚动条
        title: "图片预览", //不显示标题
        content: imgHtml, //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
        cancel: function () {
            //layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', { time: 5000, icon: 6 });
        }
    });
}

//非透明弹框(关闭全部)
function alertmsgFtm(msg) {
    layui.use('layer', function () {
        layer = layui.layer;

        layer.open({
            offset: "auto"
            ,content: '<p>'+ msg +'</p>'
            ,btn: '关闭'
            ,btnAlign: 'c' //按钮居中
            //,shade: 0 //不显示遮罩
            ,yes: function(){
                layer.closeAll();
            }
        });

    });
}
//非透明弹框(关闭当前)
function alertmsgFtmIndex(msg) {
    layui.use('layer', function () {
        layer = layui.layer;

        layer.open({
            offset: "auto"
            ,content: '<p>'+ msg +'</p>'
            ,btn: '关闭'
            ,btnAlign: 'c' //按钮居中
            //,shade: 0 //不显示遮罩
            ,yes: function(index){
                layer.close(index);
            }
        });

    });
}

function errorLogin(xhr) {
    if(xhr.status == 602){
        layui.use('layer', function () {
            var $ = layui.jquery, layer = layui.layer;

            layer.open({
                offset: "auto"
                , content: '<div style="padding: 20px 85px;">用户未登录,请重新登录</div>'
                , btn: '关闭'
                , btnAlign: 'c'
                , yes: function () {
                    $(window).attr('location', '/login')
                }
            });
            return false;

        });
    }else if(xhr.status == 603){
        layui.use('layer', function () {
            var $ = layui.jquery, layer = layui.layer;

            layer.open({
                offset: "auto"
                , content: '<div style="padding: 20px 75px;">登录信息过期，请重新登录</div>'
                , btn: '关闭'
                , btnAlign: 'c'
                , yes: function () {
                    $(window).attr('location', '/login')
                }
            });
            return false;

        });
    }else if(xhr.status == 605){
        layui.use('layer', function () {
            var $ = layui.jquery, layer = layui.layer;

            layer.open({
                offset: "auto"
                , content: '<div>'+ xhr.message +'</div>'
                , btn: '关闭'
                , btnAlign: 'c'
                , yes: function () {
                    $(window).attr('location', '/')
                }
            });
            return false;
        });
    }
}