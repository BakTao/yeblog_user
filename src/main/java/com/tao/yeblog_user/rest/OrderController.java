package com.tao.yeblog_user.rest;

import com.alibaba.fastjson.JSONObject;
import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.domain.OrderItem;
import com.alipay.api.internal.util.AlipaySignature;
import com.alipay.api.request.AlipayTradeRefundRequest;
import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.common.Response;
import com.tao.yeblog_user.model.dto.OrderDTO;
import com.tao.yeblog_user.model.qo.OrderQO;
import com.tao.yeblog_user.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * 订单管理Controller
 */
@Controller
@RequestMapping("/back/orderServices")
public class OrderController {

    @Value("${zfb.config.alipay_public_key}")
    private String alipay_public_key;

    @Value("${zfb.config.charset}")
    private String charset;

    @Value("${zfb.config.sign_type}")
    private String sign_type;

    @Autowired
    private IOrderService orderService;

    /**
     * 获取订单信息
     * @param orderQO
     * @return
     */
    @ResponseBody
    @PostMapping("/pageOrderInfo")
    public Response<IPage<OrderDTO>> pageOrderInfo(@RequestBody OrderQO orderQO, HttpServletRequest request){
        JSONObject json = (JSONObject)request.getSession().getAttribute("UserInfo");
        orderQO.setUserId(json.getString("loginId"));
        return Response.successData(orderService.pageOrderInfo(orderQO));
    }

    /**
     * 获取订单商品信息
     * @param orderQO
     * @return
     */
    @ResponseBody
    @PostMapping("/listOrderShopInfo")
    public Response<List<OrderDTO>> listOrderShopInfo(@RequestBody OrderQO orderQO){
        return Response.successData(orderService.listOrderShopInfo(orderQO));
    }

    /**
     * 获取订单商品金额(分页)
     * @param orderQO
     * @return
     */
    @ResponseBody
    @PostMapping("/pageOrderMoney")
    public Response<IPage<OrderDTO>> pageOrderMoney(@RequestBody OrderQO orderQO){
        return Response.successData(orderService.pageOrderMoney(orderQO));
    }

    /**
     * 获取订单商品金额
     * @param orderQO
     * @return
     */
    @ResponseBody
    @PostMapping("/listOrderMoney")
    public Response<List<OrderDTO>> listOrderMoney(@RequestBody OrderQO orderQO){
        return Response.successData(orderService.listOrderMoney(orderQO));
    }

    /**
     * 获取订单信息
     * @param orderDTO
     * @return
     */
    @ResponseBody
    @PostMapping("/updateOrderInfo")
    public Response<String> updateOrderInfo(@RequestBody OrderDTO orderDTO){
        return Response.successData(orderService.updateOrderInfo(orderDTO));
    }

    /**
     * 生成订单信息
     * @param
     * @return
     */
    @RequestMapping("/createOrder")
    public String createOrder(HttpServletRequest request) throws UnsupportedEncodingException, AlipayApiException {
        // 获取支付宝GET过来反馈信息
        Map params =new HashMap();
        Map requestParams = request.getParameterMap();
        for (Iterator iter = requestParams.keySet().iterator(); iter.hasNext(); ) {
            String name = (String) iter.next();
            String[] values = (String[]) requestParams.get(name);
            String valueStr ="";

            for (int i =0; i < values.length; i++) {
                valueStr = (i == values.length -1) ? valueStr + values[i] : valueStr + values[i] +",";
            }
            // 乱码解决，这段代码在出现乱码时使用
            valueStr =new String(valueStr.getBytes("utf-8"), "utf-8");
            params.put(name, valueStr);

        }
        boolean signVerified = AlipaySignature.rsaCheckV1(params, alipay_public_key, charset, sign_type); // 调用SDK验证签名
        //验证签名通过
        if (signVerified) {
            // 商户订单号
            String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"), "UTF-8");
            // 支付宝交易号
            String trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"), "UTF-8");
            // 付款金额
            String total_amount = new String(request.getParameter("total_amount").getBytes("ISO-8859-1"), "UTF-8");

            //支付成功
            OrderDTO orderDTO = new OrderDTO();
            JSONObject json = (JSONObject)request.getSession().getAttribute("UserInfo");
            orderDTO.setUserId(json.getString("loginId"));
            orderDTO.setOrderId(out_trade_no);
            orderDTO.setPrice(total_amount);

            //创建订单
            orderService.createOrder(orderDTO);
        }
        return "/order";
    }
}
