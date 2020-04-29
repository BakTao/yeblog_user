package com.tao.yeblog_user.model.dto;

import lombok.Data;

/**
 * 订单信息DTO
 */
@Data
public class OrderDTO {

    private String orderId;     //订单id

    private String userId;    //购买人id

    private String price;       //价格

    private String enable;     //是否有效

    private String createTime;   //创建时间

    private String address;   //地址

    private String userPhone;   //手机

    private String userName;        //姓名

    private String remark;   //备注

    private String expressId;   //物流id

    private String goodsId;     //商品id

    private String goodsName;     //商品名称

    private String nums;     //商品数量

    private String url;     //商品链接

    private String priceCount;     //订单总价


}
