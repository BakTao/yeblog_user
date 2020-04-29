package com.tao.yeblog_user.model.qo;

import com.tao.yeblog_user.common.BasePage;
import lombok.Data;

/**
 * 商城信息QO
 */
@Data
public class ShopQO extends BasePage {

    private String goodsName;    //名字

    private String goodsId; //商品Id

    private String userId; //用户Id

    private String numsQ;     //数量起

    private String buyNumsQ;     //购买数量起

    private String numsZ;     //数量止

    private String buyNumsZ;     //购买数量止

    private String priceQ;   //价格起

    private String priceZ;   //价格止

    private String type;   //类型

    private String enable;   //生效

    private String categoryId;  //类别ID

    private String[] categoryIds;  //类别ID数组

    private String shopOrder;  //排序


}
