package com.tao.yeblog_user.model.qo;

import com.tao.yeblog_user.common.BasePage;
import lombok.Data;

/**
 * 订单信息QO
 */
@Data
public class OrderQO extends BasePage {

    private String orderId;     //订单id

    private String userId;    //购买人id

    private String priceQ;       //总价格起

    private String priceZ;       //总价格止

    private String enable;     //是否有效

    private String createTimeQ;   //创建时间起

    private String createTimeZ;   //创建时间止

    private String address;   //地址

    private String remark;   //备注
}
