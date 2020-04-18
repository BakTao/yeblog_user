package com.tao.yeblog_user.model.qo;

import com.tao.yeblog_user.common.BasePage;
import lombok.Data;

/**
 * 博客信息QO
 */
@Data
public class BlogQO extends BasePage {

    private String blogId;  //博客id

    private String userId; //用户Id

    private String columnId; //专栏id

    private String[] columnIds; //专栏id数组

    private String title;   //标题

    private String type;   //类型

    private String[] types;   //类型数组

    private String enable; //是否有效

    private String createTimeQ; //创建时间起

    private String createTimeZ; //创建时间止

    private String collectionNumsQ; //收藏数起

    private String collectionNumsZ; //收藏数止

    private String praiseNumsQ; //点赞数起

    private String praiseNumsZ; //点赞数止

    private String viewNumsQ; //观看数起

    private String viewNumsZ; //观看数止

    private String commentNumsQ; //评论数起

    private String commentNumsZ; //评论数止

    private String ip; //ip

    private String time; //时间

    private String ifCollection; //是否收藏
}
