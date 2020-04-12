package com.tao.yeblog_user.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.common.PageDefaultImpl;
import com.tao.yeblog_user.common.Pager;
import com.tao.yeblog_user.dao.OrderMapper;
import com.tao.yeblog_user.model.dto.OrderDTO;
import com.tao.yeblog_user.model.qo.OrderQO;
import com.tao.yeblog_user.service.IOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderService implements IOrderService {

    @Autowired
    private OrderMapper orderMapper;

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
}
