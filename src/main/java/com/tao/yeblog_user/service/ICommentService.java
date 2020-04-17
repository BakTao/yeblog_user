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


}
