package com.tao.yeblog_user.rest;

import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.common.Response;
import com.tao.yeblog_user.model.dto.BlogDTO;
import com.tao.yeblog_user.model.dto.CommentDTO;
import com.tao.yeblog_user.model.qo.BlogQO;
import com.tao.yeblog_user.model.qo.CommentQO;
import com.tao.yeblog_user.service.IBlogService;
import com.tao.yeblog_user.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 评论管理Controller
 */
@RestController
@RequestMapping("/back/commentServices")
public class CommentController {

    @Autowired
    private ICommentService commentService;

    /**
     * 获取评论信息
     * @param commentQO
     * @return
     */
    @PostMapping("/pageCommentInfo")
    public Response<IPage<CommentDTO>> pageCommentInfo(@RequestBody CommentQO commentQO){
        return Response.successData(commentService.pageCommentInfo(commentQO));
    }

    /**
     * 获取用户的评论信息
     * @param commentQO
     * @return
     */
    @PostMapping("/pageUserCommentInfo")
    public Response<IPage<CommentDTO>> pageUserCommentInfo(@RequestBody CommentQO commentQO){
        return Response.successData(commentService.pageUserCommentInfo(commentQO));
    }

    /**
     * 获取用户的点赞评论信息
     * @param commentQO
     * @return
     */
    @PostMapping("/pagePraiseCommentInfo")
    public Response<IPage<CommentDTO>> pagePraiseCommentInfo(@RequestBody CommentQO commentQO){
        return Response.successData(commentService.pagePraiseCommentInfo(commentQO));
    }

    /**
     * 新增评论信息
     * @param commentDTO
     * @return
     */
    @PostMapping("/createComment")
    public Response<String> createComment(@RequestBody CommentDTO commentDTO){
        return Response.successData(commentService.createComment(commentDTO));
    }

    /**
     * 新增评论的评论信息
     * @param commentDTO
     * @return
     */
    @PostMapping("/createReplyComment")
    public Response<String> createReplyComment(@RequestBody CommentDTO commentDTO){
        return Response.successData(commentService.createReplyComment(commentDTO));
    }

    /**
     * 新增评论点赞
     * @param commentDTO
     * @return
     */
    @PostMapping("/createCommentPraise")
    public Response<String> createCommentPraise(@RequestBody CommentDTO commentDTO){
        return Response.successData(commentService.createCommentPraise(commentDTO));
    }

    /**
     * 删除评论点赞
     * @param commentDTO
     * @return
     */
    @PostMapping("/deleteCommentPraise")
    public Response<String> deleteCommentPraise(@RequestBody CommentDTO commentDTO){
        return Response.successData(commentService.deleteCommentPraise(commentDTO));
    }

    /**
     * 删除评论
     * @param commentDTO
     * @return
     */
    @PostMapping("/deleteComment")
    public Response<String> deleteComment(@RequestBody CommentDTO commentDTO){
        return Response.successData(commentService.deleteComment(commentDTO));
    }

    /**
     * 删除评论的评论
     * @param commentDTO
     * @return
     */
    @PostMapping("/deleteReplyComment")
    public Response<String> deleteReplyComment(@RequestBody CommentDTO commentDTO){
        return Response.successData(commentService.deleteReplyComment(commentDTO));
    }
}
