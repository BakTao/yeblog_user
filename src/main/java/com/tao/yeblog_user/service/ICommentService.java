package com.tao.yeblog_user.service;

import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.model.dto.BlogDTO;
import com.tao.yeblog_user.model.dto.CommentDTO;
import com.tao.yeblog_user.model.qo.BlogQO;
import com.tao.yeblog_user.model.qo.CommentQO;

/**
 * 评论管理Service
 */
public interface ICommentService {

    /**
     * 获取评论信息
     * @param commentQO
     * @return
     */
    IPage<CommentDTO> pageCommentInfo(CommentQO commentQO);

    /**
     * 获取评论的评论信息
     * @param commentQO
     * @return
     */
    IPage<CommentDTO> pageReplyCommentInfo(CommentQO commentQO);

    /**
     * 获取用户的评论信息
     * @param commentQO
     * @return
     */
    IPage<CommentDTO> pageUserCommentInfo(CommentQO commentQO);

    /**
     * 获取用户的点赞评论信息
     * @param commentQO
     * @return
     */
    IPage<CommentDTO> pagePraiseCommentInfo(CommentQO commentQO);


    /**
     * 新增评论信息
     * @param commentDTO
     * @return
     */
    String createComment(CommentDTO commentDTO);

    /**
     * 新增评论的评论信息
     * @param commentDTO
     * @return
     */
    String createReplyComment(CommentDTO commentDTO);

    /**
     * 新增评论点赞
     * @param commentDTO
     * @return
     */
    String createCommentPraise(CommentDTO commentDTO);

    /**
     * 删除评论点赞
     * @param commentDTO
     * @return
     */
    String deleteCommentPraise(CommentDTO commentDTO);

    /**
     * 删除评论
     * @param commentDTO
     * @return
     */
    String deleteComment(CommentDTO commentDTO);

    /**
     * 删除评论的评论
     * @param commentDTO
     * @return
     */
    String deleteReplyComment(CommentDTO commentDTO);
}
