package com.tao.yeblog_user.service;

import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.model.dto.OrderDTO;
import com.tao.yeblog_user.model.qo.OrderQO;

import java.util.List;

/**
 * 订单管理Service
 */
public interface IOrderService {

    /**
     * 获取订单信息
     * @param orderQO
     * @return
     */
    IPage<OrderDTO> pageOrderInfo(OrderQO orderQO);

    /**
     * 获取订单商品信息
     * @param orderQO
     * @return
     */
    List<OrderDTO> listOrderShopInfo(OrderQO orderQO);

    /**
     * 获取订单商品金额(分页)
     * @param orderQO
     * @return
     */
    IPage<OrderDTO> pageOrderMoney(OrderQO orderQO);

    /**
     * 获取订单商品金额
     * @param orderQO
     * @return
     */
    List<OrderDTO> listOrderMoney(OrderQO orderQO);

    /**
     * 更新订单信息
     * @param orderDTO
     * @return
     */
    String updateOrderInfo(OrderDTO orderDTO);

    /**
     * 生成订单信息
     * @param orderDTO
     * @return
     */
    String createOrder(OrderDTO orderDTO);
}
