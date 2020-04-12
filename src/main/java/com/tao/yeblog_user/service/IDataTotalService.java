package com.tao.yeblog_user.service;

import com.tao.yeblog_user.model.dto.BlogChartsDTO;
import com.tao.yeblog_user.model.dto.OrderChartsDTO;
import com.tao.yeblog_user.model.dto.RegisterChartsDTO;
import com.tao.yeblog_user.model.qo.BlogChartsQO;
import com.tao.yeblog_user.model.qo.OrderChartsQO;
import com.tao.yeblog_user.model.qo.RegisterChartsQO;

import java.util.List;

/**
 * 数据统计Service
 */
public interface IDataTotalService {

    /**
     * 获取注册量
     * @param registerChartsQO
     * @return
     */
    List<RegisterChartsDTO> getRegisterCount(RegisterChartsQO registerChartsQO);

    /**
     * 获取博客量(按博客类型)
     * @param blogChartsQO
     * @return
     */
    List<BlogChartsDTO> getBlogCountBylx(BlogChartsQO blogChartsQO);

    /**
     * 获取博客量(按是否有效)
     * @param blogChartsQO
     * @return
     */
    List<BlogChartsDTO> getBlogCountByyx(BlogChartsQO blogChartsQO);

    /**
     * 获取博客量(按专栏名称)
     * @param blogChartsQO
     * @return
     */
    List<BlogChartsDTO> getBlogCountByColumn(BlogChartsQO blogChartsQO);

    /**
     * 获取博客量(非草稿有效)
     * @param
     * @return
     */
    List<BlogChartsDTO> getBlogCountByOne();

    /**
     * 获取订单量
     * @param orderChartsQO
     * @return
     */
    List<OrderChartsDTO> getOrderCount(OrderChartsQO orderChartsQO);

    /**
     * 获取订单金额
     * @param orderChartsQO
     * @return
     */
    List<OrderChartsDTO> getOrderMoney(OrderChartsQO orderChartsQO);

    /**
     * 获取订单金额
     * @param
     * @return
     */
    List<OrderChartsDTO> getOrderMoneyCountByOne();
}
