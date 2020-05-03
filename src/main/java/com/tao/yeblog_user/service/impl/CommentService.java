package com.tao.yeblog_user.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.common.PageDefaultImpl;
import com.tao.yeblog_user.common.Pager;
import com.tao.yeblog_user.dao.BlogMapper;
import com.tao.yeblog_user.dao.CommentMapper;
import com.tao.yeblog_user.model.dto.BlogDTO;
import com.tao.yeblog_user.model.dto.CommentDTO;
import com.tao.yeblog_user.model.qo.BlogQO;
import com.tao.yeblog_user.model.qo.CommentQO;
import com.tao.yeblog_user.service.IBlogService;
import com.tao.yeblog_user.service.ICommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService implements ICommentService {

    @Autowired
    private CommentMapper commentMapper;

    @Override
    public IPage<CommentDTO> pageCommentInfo(CommentQO commentQO) {

        PageDefaultImpl<CommentDTO> page = new PageDefaultImpl<>();

        PageHelper.startPage(commentQO.getPageIndex(),commentQO.getPageSize());
        Page<CommentDTO> pageData = commentMapper.pageCommentInfo(commentQO);
        for(int i = 0; i < pageData.size(); i++){
            PageDefaultImpl<CommentDTO> commentPage = new PageDefaultImpl<>();
            CommentQO query = new CommentQO();
            query.setCommentId(pageData.get(i).getId());
            PageHelper.startPage(1,5);
            Page<CommentDTO> comments = commentMapper.listReplyCommentInfo(query);
            PageInfo<CommentDTO> pageInfo = new PageInfo<>(comments);

            Pager pager = new Pager();
            pager.setPageIndex(pageInfo.getPageNum());
            pager.setPageSize(pageInfo.getPageSize());
            pager.setPageCount(pageInfo.getPages());
            pager.setRecordCount(pageInfo.getTotal());
            pager.setPrePageIndex(pageInfo.getPrePage());
            pager.setNextPageIndex(pageInfo.getNextPage());
            pager.setExistsPrePage(pageInfo.isHasPreviousPage());
            pager.setExistsNextPage(pageInfo.isHasNextPage());

            commentPage.setPager(pager);
            commentPage.setData(pageInfo.getList());


            pageData.get(i).setComments(commentPage);
        }
        PageInfo<CommentDTO> pageInfo = new PageInfo<>(pageData);

        Pager pager = new Pager();
        pager.setPageIndex(pageInfo.getPageNum());
        pager.setPageSize(pageInfo.getPageSize());
        pager.setPageCount(pageInfo.getPages());
        pager.setRecordCount(pageInfo.getTotal());
        pager.setPrePageIndex(pageInfo.getPrePage());
        pager.setNextPageIndex(pageInfo.getNextPage());
        pager.setExistsPrePage(pageInfo.isHasPreviousPage());
        pager.setExistsNextPage(pageInfo.isHasNextPage());

        page.setPager(pager);
        page.setData(pageInfo.getList());

        return page;
    }

    @Override
    public IPage<CommentDTO> pageReplyCommentInfo(CommentQO commentQO) {
        PageDefaultImpl<CommentDTO> page = new PageDefaultImpl<>();

        commentQO.setPageSize(5);
        PageHelper.startPage(commentQO.getPageIndex(),commentQO.getPageSize());
        PageInfo<CommentDTO> pageInfo = new PageInfo<>(commentMapper.listReplyCommentInfo(commentQO));

        Pager pager = new Pager();
        pager.setPageIndex(pageInfo.getPageNum());
        pager.setPageSize(pageInfo.getPageSize());
        pager.setPageCount(pageInfo.getPages());
        pager.setRecordCount(pageInfo.getTotal());
        pager.setPrePageIndex(pageInfo.getPrePage());
        pager.setNextPageIndex(pageInfo.getNextPage());
        pager.setExistsPrePage(pageInfo.isHasPreviousPage());
        pager.setExistsNextPage(pageInfo.isHasNextPage());

        page.setPager(pager);
        page.setData(pageInfo.getList());

        return page;
    }

    @Override
    public IPage<CommentDTO> pageUserCommentInfo(CommentQO commentQO) {

        PageDefaultImpl<CommentDTO> page = new PageDefaultImpl<>();

        PageHelper.startPage(commentQO.getPageIndex(),commentQO.getPageSize());
        PageInfo<CommentDTO> pageInfo = new PageInfo<>(commentMapper.pageUserCommentInfo(commentQO));

        Pager pager = new Pager();
        pager.setPageIndex(pageInfo.getPageNum());
        pager.setPageSize(pageInfo.getPageSize());
        pager.setPageCount(pageInfo.getPages());
        pager.setRecordCount(pageInfo.getTotal());
        pager.setPrePageIndex(pageInfo.getPrePage());
        pager.setNextPageIndex(pageInfo.getNextPage());
        pager.setExistsPrePage(pageInfo.isHasPreviousPage());
        pager.setExistsNextPage(pageInfo.isHasNextPage());

        page.setPager(pager);
        page.setData(pageInfo.getList());

        return page;
    }

    @Override
    public IPage<CommentDTO> pagePraiseCommentInfo(CommentQO commentQO) {

        PageDefaultImpl<CommentDTO> page = new PageDefaultImpl<>();

        PageHelper.startPage(commentQO.getPageIndex(),commentQO.getPageSize());

        PageInfo<CommentDTO> pageInfo = new PageInfo<>(commentMapper.pagePraiseCommentInfo(commentQO));

        Pager pager = new Pager();
        pager.setPageIndex(pageInfo.getPageNum());
        pager.setPageSize(pageInfo.getPageSize());
        pager.setPageCount(pageInfo.getPages());
        pager.setRecordCount(pageInfo.getTotal());
        pager.setPrePageIndex(pageInfo.getPrePage());
        pager.setNextPageIndex(pageInfo.getNextPage());
        pager.setExistsPrePage(pageInfo.isHasPreviousPage());
        pager.setExistsNextPage(pageInfo.isHasNextPage());

        page.setPager(pager);
        page.setData(pageInfo.getList());

        return page;
    }

    @Override
    public String createComment(CommentDTO commentDTO) {
        commentMapper.createComment(commentDTO);
        return "success";
    }

    @Override
    public String createReplyComment(CommentDTO commentDTO) {
        commentMapper.createReplyComment(commentDTO);
        return "success";
    }

    @Override
    public String createCommentPraise(CommentDTO commentDTO) {
        commentMapper.createCommentPraise(commentDTO);
        return "success";
    }

    @Override
    public String deleteCommentPraise(CommentDTO commentDTO) {
        commentMapper.deleteCommentPraise(commentDTO);
        return "success";
    }

    @Override
    public String deleteComment(CommentDTO commentDTO) {
        commentMapper.deleteComment(commentDTO);
        return "success";
    }

    @Override
    public String deleteReplyComment(CommentDTO commentDTO) {
        commentMapper.deleteReplyComment(commentDTO);
        return "success";
    }
}
