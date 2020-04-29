package com.tao.yeblog_user.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.common.PageDefaultImpl;
import com.tao.yeblog_user.common.Pager;
import com.tao.yeblog_user.dao.OrderMapper;
import com.tao.yeblog_user.dao.ShopMapper;
import com.tao.yeblog_user.model.dto.OrderDTO;
import com.tao.yeblog_user.model.dto.ShopDTO;
import com.tao.yeblog_user.model.qo.OrderQO;
import com.tao.yeblog_user.model.qo.ShopQO;
import com.tao.yeblog_user.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class OrderService implements IOrderService {

    @Autowired
    private OrderMapper orderMapper;

    @Autowired
    private ShopMapper shopMapper;

    @Override
    public IPage<OrderDTO> pageOrderInfo(OrderQO orderQO) {
        PageDefaultImpl<OrderDTO> page = new PageDefaultImpl<>();

        PageHelper.startPage(orderQO.getPageIndex(),orderQO.getPageSize());
        PageInfo<OrderDTO> pageInfo = new PageInfo<>(orderMapper.pageOrderInfo(orderQO));

        Pager pager = new Pager();
        pager.setPageIndex(pageInfo.getPageNum());
        pager.setPageSize(pageInfo.getPageSize());
        pager.setPageCount(pageInfo.getPages());
        pager.setRecordCount(pageInfo.getTotal());
        pager.setPrePageIndex(pageInfo.getPrePage());
        pager.setNextPageIndex(pageInfo.getNextPage());
        pager.setExistsPrePage(pageInfo.isHasPreviousPage());
        pager.setExistsNextPage(pageInfo.isHasNextPage());

        page.setPager(pager);
        page.setData(pageInfo.getList());

        return page;
    }

    @Override
    public List<OrderDTO> listOrderShopInfo(OrderQO orderQO) {
        return orderMapper.listOrderShopInfo(orderQO);

    }

    @Override
    public IPage<OrderDTO> pageOrderMoney(OrderQO orderQO) {
        PageDefaultImpl<OrderDTO> page = new PageDefaultImpl<>();

        PageHelper.startPage(orderQO.getPageIndex(),orderQO.getPageSize());
        PageInfo<OrderDTO> pageInfo = new PageInfo<>(orderMapper.listOrderMoney(orderQO));

        Pager pager = new Pager();
        pager.setPageIndex(pageInfo.getPageNum());
        pager.setPageSize(pageInfo.getPageSize());
        pager.setPageCount(pageInfo.getPages());
        pager.setRecordCount(pageInfo.getTotal());
        pager.setPrePageIndex(pageInfo.getPrePage());
        pager.setNextPageIndex(pageInfo.getNextPage());
        pager.setExistsPrePage(pageInfo.isHasPreviousPage());
        pager.setExistsNextPage(pageInfo.isHasNextPage());

        page.setPager(pager);
        page.setData(pageInfo.getList());

        return page;
    }

    @Override
    public List<OrderDTO> listOrderMoney(OrderQO orderQO) {
        return orderMapper.listOrderMoney(orderQO);
    }

    @Override
    public String updateOrderInfo(OrderDTO orderDTO) {
        orderMapper.updateOrderInfo(orderDTO);
        return "success";
    }

    @Override
    public String createOrder(OrderDTO orderDTO) {
        //获取购物车总价
        ShopQO shopQO = new ShopQO();
        shopQO.setUserId(orderDTO.getUserId());
        String price = shopMapper.getShopCarPrice(shopQO).getOrderPriceCount();

        //创建订单
        String orderId = "o" + new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());
        orderDTO.setOrderId(orderId);
        orderDTO.setPrice(price);
        orderMapper.createOrder(orderDTO);

        //创建订单商品关联信息
        OrderDTO data = new OrderDTO();
        data.setOrderId(orderId);
        orderMapper.createOrderShop(data);

        //更新商品表各个商品购买数
        List<ShopDTO> list = shopMapper.listShopCarInfo(shopQO);
        for(int i=0; i<list.size(); i++){
            ShopDTO shopDTO = new ShopDTO();
            shopDTO.setGoodsId(list.get(i).getGoodsId());
            shopDTO.setNums(list.get(i).getNums());
            shopMapper.updateShopInfo(shopDTO);
        }

        //清空购物车
        ShopDTO shopDTO = new ShopDTO();
        shopDTO.setUserId(orderDTO.getUserId());
        shopMapper.deleteShopCar(shopDTO);
        return "success";
    }
}
