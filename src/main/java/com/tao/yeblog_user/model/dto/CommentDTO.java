package com.tao.yeblog_user.model.dto;

import lombok.Data;

import java.util.List;

/**
 * 评论信息DTO
 */
@Data
public class CommentDTO {

    private String id;      //id

    private String blogId;  //博客id

    private String userId; //用户Id

    private String replyUserId; //回复用户Id

    private String userName; //用户名字

    private String replyUserName;//回复用户名字

    private String content; //内容

    private String userPhoto; //头像

    private String enable; //是否有效

    private String time; //创建时间

    private Integer rank; //楼数

    private String praiseNums; //评论数

    private List<CommentDTO> comments;
}
