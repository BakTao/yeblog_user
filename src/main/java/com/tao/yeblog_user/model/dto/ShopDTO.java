package com.tao.yeblog_user.model.dto;

import lombok.Data;

/**
 * 商城信息DTO
 */
@Data
public class ShopDTO {

    private String goodsName;    //名字

    private String goodsId; //商品Id

    private String nums;     //数量

    private String buyNums;     //购买数量

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


}
