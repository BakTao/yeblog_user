package com.tao.yeblog_user.rest;

import com.alibaba.fastjson.JSONObject;
import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.common.Response;
import com.tao.yeblog_user.model.dto.OrderDTO;
import com.tao.yeblog_user.model.qo.OrderQO;
import com.tao.yeblog_user.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 订单管理Controller
 */
@Controller
@RequestMapping("/back/orderServices")
public class OrderController {

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
    public String createOrder(HttpServletRequest request){
        OrderDTO orderDTO = new OrderDTO();
        JSONObject json = (JSONObject)request.getSession().getAttribute("UserInfo");
        orderDTO.setUserId(json.getString("loginId"));
        orderService.createOrder(orderDTO);
        return "/order";
    }
}
