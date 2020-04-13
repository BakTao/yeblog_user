package com.tao.yeblog_user.model.dto;

import lombok.Data;

/**
 * 博客信息DTO
 */
@Data
public class BlogDTO {

    private String blogId;  //博客id

    private String[] blogIds;  //博客id数组

    private String userId; //用户Id

    private String userName; //用户名字

    private String columnId; //专栏id

    private String newColumnId; //专栏id

    private String columnName; //专栏名称

    private String title;   //标题

    private String type;   //类型

    private String content; //内容

    private String cover; //封面

    private String enable; //是否有效

    private String createTime; //创建时间

    private String reason; //原因

    private String collectionNums; //收藏数

    private String praiseNums; //点赞数

    private String viewNums; //观看数

    private String commentNums; //评论数
}
