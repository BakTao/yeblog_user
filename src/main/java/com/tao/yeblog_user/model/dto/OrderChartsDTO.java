package com.tao.yeblog_user.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 订单量统计DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class OrderChartsDTO {

    private String tjny;    //统计年月

    private String value;   //值

    private String type;   //类型

    private String price;   //价格
}
