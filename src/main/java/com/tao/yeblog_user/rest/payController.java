package com.tao.yeblog_user.rest;

import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipayTradePagePayRequest;
import com.tao.yeblog_user.common.Response;
import com.tao.yeblog_user.model.dto.ShopDTO;
import com.tao.yeblog_user.model.qo.ShopQO;
import com.tao.yeblog_user.service.IShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
public class payController {
    @Value("${zfb.config.app_id}")
    private String app_id;

    @Value("${zfb.config.merchant_private_key}")
    private String merchant_private_key;

    @Value("${zfb.config.alipay_public_key}")
    private String alipay_public_key;

    @Value("${zfb.config.gatewayUrl}")
    private String gatewayUrl;

    @Value("${zfb.config.format}")
    private String format;

    @Value("${zfb.config.charset}")
    private String charset;

    @Value("${zfb.config.sign_type}")
    private String sign_type;

    @Value("${zfb.config.notify_url}")
    private String notify_url;

    @Value("${zfb.config.return_url}")
    private String return_url;

    @Autowired
    private IShopService shopService;

    @RequestMapping("/alipay")
    public void alipay(HttpServletRequest request, HttpServletResponse httpResponse) throws IOException {
        JSONObject json = (JSONObject)request.getSession().getAttribute("UserInfo");
        if(json == null || json.getString("loginId") == null){

        }
        else{
            ShopQO shopQO = new ShopQO();
            shopQO.setUserId(json.getString("loginId"));
            String result = shopService.checkShopCar(shopQO);
            if("error".equals(result)){

            }else{
                //实例化客户端,填入所需参数
                AlipayClient alipayClient = new DefaultAlipayClient(gatewayUrl, app_id, merchant_private_key, format, charset, alipay_public_key, sign_type);
                AlipayTradePagePayRequest pagePayRequest = new AlipayTradePagePayRequest();
                //在公共参数中设置回跳和通知地址
                pagePayRequest.setReturnUrl(return_url);
                pagePayRequest.setNotifyUrl(notify_url);
                //根据订单编号,查询订单相关信息

                ShopDTO shopDTO = shopService.getShopCarPrice(shopQO);
                if(shopDTO != null){
                    //商户订单号，商户网站订单系统中唯一订单号，必填
                    String out_trade_no = new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());
                    //付款金额，必填
                    String total_amount = shopDTO.getOrderPriceCount();
                    //订单名称，必填
                    String subject = "商品订单";
                    //商品描述，可空
                    String body = "";
                    pagePayRequest.setBizContent("{\"out_trade_no\":\""+ out_trade_no +"\","
                            + "\"total_amount\":\""+ total_amount +"\","
                            + "\"subject\":\""+ subject +"\","
                            + "\"body\":\""+ body +"\","
                            + "\"product_code\":\"FAST_INSTANT_TRADE_PAY\"}");
                    String form = "";
                    try {
                        form = alipayClient.pageExecute(pagePayRequest).getBody(); // 调用SDK生成表单
                    } catch (AlipayApiException e) {
                        e.printStackTrace();
                    }
                    httpResponse.setContentType("text/html;charset=" + charset);
                    httpResponse.getWriter().write(form);// 直接将完整的表单html输出到页面
                    httpResponse.getWriter().flush();
                    httpResponse.getWriter().close();
                }
            }
        }
    }
}
