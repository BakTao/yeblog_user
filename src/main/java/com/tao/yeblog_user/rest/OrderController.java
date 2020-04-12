package com.tao.yeblog_user.rest;

import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.common.Response;
import com.tao.yeblog_user.model.dto.OrderDTO;
import com.tao.yeblog_user.model.qo.OrderQO;
import com.tao.yeblog_user.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 订单管理Controller
 */
@RestController
@RequestMapping("/back/orderServices")
public class OrderController {

    @Autowired
    private IOrderService orderService;

    /**
     * 获取订单信息
     * @param orderQO
     * @return
     */
    @PostMapping("/pageOrderInfo")
    public Response<IPage<OrderDTO>> pageOrderInfo(@RequestBody OrderQO orderQO){
        return Response.successData(orderService.pageOrderInfo(orderQO));
    }

    /**
     * 获取订单商品信息
     * @param orderQO
     * @return
     */
    @PostMapping("/listOrderShopInfo")
    public Response<List<OrderDTO>> listOrderShopInfo(@RequestBody OrderQO orderQO){
        return Response.successData(orderService.listOrderShopInfo(orderQO));
    }

    /**
     * 获取订单商品金额(分页)
     * @param orderQO
     * @return
     */
    @PostMapping("/pageOrderMoney")
    public Response<IPage<OrderDTO>> pageOrderMoney(@RequestBody OrderQO orderQO){
        return Response.successData(orderService.pageOrderMoney(orderQO));
    }

    /**
     * 获取订单商品金额
     * @param orderQO
     * @return
     */
    @PostMapping("/listOrderMoney")
    public Response<List<OrderDTO>> listOrderMoney(@RequestBody OrderQO orderQO){
        return Response.successData(orderService.listOrderMoney(orderQO));
    }

    /**
     * 获取订单信息
     * @param orderDTO
     * @return
     */
    @PostMapping("/updateOrderInfo")
    public Response<String> updateOrderInfo(@RequestBody OrderDTO orderDTO){
        return Response.successData(orderService.updateOrderInfo(orderDTO));
    }
}
