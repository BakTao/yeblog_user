package com.tao.yeblog_user.dao;

import com.github.pagehelper.Page;
import com.tao.yeblog_user.model.dto.OrderDTO;
import com.tao.yeblog_user.model.qo.OrderQO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 订单管理Mapper
 */
@Mapper
public interface OrderMapper {

    /**
     * 获取订单信息
     * @param orderQO
     * @return
     */
    Page<OrderDTO> pageOrderInfo(OrderQO orderQO);

    /**
     * 获取订单信息
     * @param orderQO
     * @return
     */
    List<OrderDTO> listOrderShopInfo(OrderQO orderQO);

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
    void updateOrderInfo(OrderDTO orderDTO);

    /**
     * 生成订单信息
     * @param orderDTO
     * @return
     */
    void createOrder(OrderDTO orderDTO);

    /**
     * 生成订单商品信息
     * @param orderDTO
     * @return
     */
    void createOrderShop(OrderDTO orderDTO);

}
