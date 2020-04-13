package com.tao.yeblog_user.model.qo;

import com.tao.yeblog_user.common.BasePage;
import lombok.Data;

/**
 * 评论信息QO
 */
@Data
public class CommentQO extends BasePage {

    private String blogId;  //博客id

    private String commentId;  //评论id

    private String userId; //用户Id

    private String enable; //是否有效

    private String timeQ; //创建时间起

    private String timeZ; //创建时间止

    private String praiseNumsQ; //点赞数起

    private String praiseNumsZ; //点赞数止

    private String sort; //排序
}
