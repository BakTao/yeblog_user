package com.tao.yeblog_user.service.impl;

import com.tao.yeblog_user.dao.BlogTotalMapper;
import com.tao.yeblog_user.dao.OrderTotalMapper;
import com.tao.yeblog_user.dao.RegisterTotalMapper;
import com.tao.yeblog_user.model.dto.BlogChartsDTO;
import com.tao.yeblog_user.model.dto.OrderChartsDTO;
import com.tao.yeblog_user.model.dto.RegisterChartsDTO;
import com.tao.yeblog_user.model.qo.BlogChartsQO;
import com.tao.yeblog_user.model.qo.OrderChartsQO;
import com.tao.yeblog_user.model.qo.RegisterChartsQO;
import com.tao.yeblog_user.service.IDataTotalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DataTotalService implements IDataTotalService {

    @Autowired
    private RegisterTotalMapper registerTotalMapper;

    @Autowired
    private BlogTotalMapper blogTotalMapper;

    @Autowired
    private OrderTotalMapper orderTotalMapper;

    @Override
    public List<RegisterChartsDTO> getRegisterCount(RegisterChartsQO registerChartsQO) {
        if("1".equals(registerChartsQO.getSjwd())){
            return registerTotalMapper.getRegisterCountByYear(registerChartsQO);
        }else if("2".equals(registerChartsQO.getSjwd())){
            return registerTotalMapper.getRegisterCountByMonth(registerChartsQO);
        }else if("3".equals(registerChartsQO.getSjwd())){
            return registerTotalMapper.getRegisterCountByDay(registerChartsQO);
        }else{
            return registerTotalMapper.getRegisterCountByWeek(registerChartsQO);
        }
    }

    @Override
    public List<BlogChartsDTO> getBlogCountBylx(BlogChartsQO blogChartsQO) {
        if("1".equals(blogChartsQO.getSjwd())){
            return blogTotalMapper.getBlogCountBylxByYear(blogChartsQO);
        }else if("2".equals(blogChartsQO.getSjwd())){
            return blogTotalMapper.getBlogCountBylxByMonth(blogChartsQO);
        }else if("3".equals(blogChartsQO.getSjwd())){
            return blogTotalMapper.getBlogCountBylxByDay(blogChartsQO);
        }else{
            return blogTotalMapper.getBlogCountByWeek();
        }
    }

    @Override
    public List<BlogChartsDTO> getBlogCountByyx(BlogChartsQO blogChartsQO) {
        if(blogChartsQO.getBlogType() != null && !"".equals(blogChartsQO.getBlogType())){
            blogChartsQO.setBlogTypes(blogChartsQO.getBlogType().split(","));
        }
        if("1".equals(blogChartsQO.getSjwd())){
            return blogTotalMapper.getBlogCountByyxByYear(blogChartsQO);
        }else if("2".equals(blogChartsQO.getSjwd())){
            return blogTotalMapper.getBlogCountByyxByMonth(blogChartsQO);
        }else{
            return blogTotalMapper.getBlogCountByyxByDay(blogChartsQO);
        }
    }

    @Override
    public List<BlogChartsDTO> getBlogCountByColumn(BlogChartsQO blogChartsQO) {
        if(blogChartsQO.getColumnId() != null && !"".equals(blogChartsQO.getColumnId())){
            blogChartsQO.setColumnIds(blogChartsQO.getColumnId().split(","));
        }
        return blogTotalMapper.getBlogCountByColumn(blogChartsQO);

    }

    @Override
    public List<BlogChartsDTO> getBlogCountByOne() {
        return blogTotalMapper.getBlogCountByOne();

    }

    @Override
    public List<OrderChartsDTO> getOrderCount(OrderChartsQO orderChartsQO) {
        if("1".equals(orderChartsQO.getSjwd())){
            return orderTotalMapper.getOrderCountByYear();
        }else if("2".equals(orderChartsQO.getSjwd())){
            return orderTotalMapper.getOrderCountByMonth();
        }else{
            return orderTotalMapper.getOrderCountByDay();
        }
    }

    @Override
    public List<OrderChartsDTO> getOrderMoney(OrderChartsQO orderChartsQO) {
        if("1".equals(orderChartsQO.getSjwd())){
            return orderTotalMapper.getOrderMoneyByYear();
        }else if("2".equals(orderChartsQO.getSjwd())){
            return orderTotalMapper.getOrderMoneyByMonth();
        }else{
            return orderTotalMapper.getOrderMoneyByDay();
        }
    }

    @Override
    public List<OrderChartsDTO> getOrderMoneyCountByOne() {
        return orderTotalMapper.getOrderMoneyCountByOne();

    }
}
