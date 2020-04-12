package com.tao.yeblog_user.model.dto;

import lombok.Data;

/**
 * 专栏信息DTO
 */
@Data
public class ColumnDTO {

    private String columnName;    //名字

    private String columnId; //专栏Id

    private String blogCount; //博客数量(合计)

    private String blogCount0; //博客数量(原创合计)

    private String blogCount00; //博客数量(原创无效)

    private String blogCount01; //博客数量(原创有效)

    private String blogCount02; //博客数量(原创未审核)

    private String blogCount1; //博客数量(转载合计)

    private String blogCount10; //博客数量(转载无效)

    private String blogCount11; //博客数量(转载有效)

    private String blogCount12; //博客数量(转载未审核)


}
