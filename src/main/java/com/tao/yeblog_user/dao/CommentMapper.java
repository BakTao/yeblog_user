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
     * 获取评论信息
     * @param commentQO
     * @return
     */
    List<CommentDTO> listReplyCommentInfo(CommentQO commentQO);


}
