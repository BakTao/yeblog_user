package com.tao.yeblog_user.rest;

import com.tao.yeblog_user.common.Response;
import com.tao.yeblog_user.model.dto.BlogChartsDTO;
import com.tao.yeblog_user.model.dto.OrderChartsDTO;
import com.tao.yeblog_user.model.dto.RegisterChartsDTO;
import com.tao.yeblog_user.model.qo.BlogChartsQO;
import com.tao.yeblog_user.model.qo.OrderChartsQO;
import com.tao.yeblog_user.model.qo.RegisterChartsQO;
import com.tao.yeblog_user.service.IDataTotalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 数据统计Controller
 */
@RestController
@RequestMapping("/back/dataTotal")
public class DataTotalContorller {

    @Autowired
    private IDataTotalService dataTotalService;

    /**
     * 获取注册量
     * @param registerChartsQO
     * @return
     */
    @PostMapping("/getRegisterCount")
    public Response<List<RegisterChartsDTO>> getRegisterCount(@RequestBody RegisterChartsQO registerChartsQO){
        return Response.successData(dataTotalService.getRegisterCount(registerChartsQO));
    }

    /**
     * 获取博客量(按博客类型)
     * @param blogChartsQO
     * @return
     */
    @PostMapping("/getBlogCountBylx")
    public Response<List<BlogChartsDTO>> getBlogCountBylx(@RequestBody BlogChartsQO blogChartsQO){
        return Response.successData(dataTotalService.getBlogCountBylx(blogChartsQO));
    }

    /**
     * 获取博客量(按是否有效)
     * @param blogChartsQO
     * @return
     */
    @PostMapping("/getBlogCountByyx")
    public Response<List<BlogChartsDTO>> getBlogCountByyx(@RequestBody BlogChartsQO blogChartsQO){
        return Response.successData(dataTotalService.getBlogCountByyx(blogChartsQO));
    }

    /**
     * 获取博客量(按专栏名称)
     * @param blogChartsQO
     * @return
     */
    @PostMapping("/getBlogCountByColumn")
    public Response<List<BlogChartsDTO>> getBlogCountByColumn(@RequestBody BlogChartsQO blogChartsQO){
        return Response.successData(dataTotalService.getBlogCountByColumn(blogChartsQO));
    }

    /**
     * 获取博客量(非草稿有效)
     * @param
     * @return
     */
    @PostMapping("/getBlogCountByOne")
    public Response<List<BlogChartsDTO>> getBlogCountByOne(){
        return Response.successData(dataTotalService.getBlogCountByOne());
    }


    /**
     * 获取订单量
     * @param orderChartsQO
     * @return
     */
    @PostMapping("/getOrderCount")
    public Response<List<OrderChartsDTO>> getOrderCount(@RequestBody OrderChartsQO orderChartsQO){
        return Response.successData(dataTotalService.getOrderCount(orderChartsQO));
    }

    /**
     * 获取订单金额
     * @param orderChartsQO
     * @return
     */
    @PostMapping("/getOrderMoney")
    public Response<List<OrderChartsDTO>> getOrderMoney(@RequestBody OrderChartsQO orderChartsQO){
        return Response.successData(dataTotalService.getOrderMoney(orderChartsQO));
    }

    /**
     * 获取订单量金额(今日)
     * @param
     * @return
     */
    @PostMapping("/getOrderMoneyCountByOne")
    public Response<List<OrderChartsDTO>> getOrderMoneyCountByOne(){
        return Response.successData(dataTotalService.getOrderMoneyCountByOne());
    }
}
