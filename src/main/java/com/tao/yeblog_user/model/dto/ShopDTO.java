package com.tao.yeblog_user.model.dto;

import lombok.Data;

/**
 * 商城信息DTO
 */
@Data
public class ShopDTO {

    private String goodsName;    //名字

    private String goodsId; //商品Id

    private String userId; //商品Id

    private String nums;     //数量

    private String buyNums;     //购买数量

    private String leftNums;     //剩余数量

    private String price;   //价格

    private String photo;   //图片

    private String type;   //类型

    private String content;   //商品介绍

    private String categoryId;  //类别ID

    private String[] categoryIds;  //类别ID数组

    private String categoryName;    //类别名称

    private String bookFile;    //电子物品链接

    private String bookFileName;    //电子物品名称

    private String enable;  //是否生效

    private String priceCount;  //商品总价

    private String orderPriceCount;  //订单商品总价

    private String add;  //加

    private String sub;  //减

    private String checkNums;  //检查是否足够


}
