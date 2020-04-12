package com.tao.yeblog_user.model.qo;

import lombok.Data;

/**
 * 注册量统计QO
 */
@Data
public class RegisterChartsQO {

    private String tjnyq; //统计年月起

    private String tjnyz; //统计年月止

    private String sjwd;    //时间维度,1-年,2-月,3-天
}
