package com.tao.yeblog_user.dao;

import com.github.pagehelper.Page;
import com.tao.yeblog_user.model.dto.BlogDTO;
import com.tao.yeblog_user.model.dto.CommentDTO;
import com.tao.yeblog_user.model.qo.BlogQO;
import com.tao.yeblog_user.model.qo.CommentQO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 评论管理Mapper
 */
@Mapper
public interface CommentMapper {

    /**
     * 获取评论信息
     * @param commentQO
     * @return
     */
    Page<CommentDTO> pageCommentInfo(CommentQO commentQO);

    /**
     * 获取用户的评论信息
     * @param commentQO
     * @return
     */
    Page<CommentDTO> pageUserCommentInfo(CommentQO commentQO);

    /**
     * 获取用户的点赞评论信息
     * @param commentQO
     * @return
     */
    Page<CommentDTO> pagePraiseCommentInfo(CommentQO commentQO);

    /**
     * 获取评论信息
     * @param commentQO
     * @return
     */
    List<CommentDTO> listReplyCommentInfo(CommentQO commentQO);

    /**
     * 新增评论信息
     * @param commentDTO
     * @return
     */
    void createComment(CommentDTO commentDTO);

    /**
     * 新增评论的评论信息
     * @param commentDTO
     * @return
     */
    void createReplyComment(CommentDTO commentDTO);

    /**
     * 新增评论点赞
     * @param commentDTO
     * @return
     */
    void createCommentPraise(CommentDTO commentDTO);

    /**
     * 删除评论点赞
     * @param commentDTO
     * @return
     */
    void deleteCommentPraise(CommentDTO commentDTO);

    /**
     * 删除评论
     * @param commentDTO
     * @return
     */
    void deleteComment(CommentDTO commentDTO);

    /**
     * 删除评论的评论
     * @param commentDTO
     * @return
     */
    void deleteReplyComment(CommentDTO commentDTO);

}
