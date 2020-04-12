package com.tao.yeblog_user.model.qo;

import lombok.Data;

/**
 * 博客量统计QO
 */
@Data
public class BlogChartsQO {

    private String tjnyq; //统计年月起

    private String tjnyz; //统计年月止

    private String sjwd;    //时间维度,1-年,2-月,3-天

    private String blogType;    //博客类型

    private String[] blogTypes;    //博客类型数组

    private String columnId;    //专栏ID

    private String[] columnIds;    //专栏ID数组

}
