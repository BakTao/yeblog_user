package com.tao.yeblog_user.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.common.PageDefaultImpl;
import com.tao.yeblog_user.common.Pager;
import com.tao.yeblog_user.dao.BlogMapper;
import com.tao.yeblog_user.model.dto.BlogDTO;
import com.tao.yeblog_user.model.qo.BlogQO;
import com.tao.yeblog_user.service.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BlogService implements  IBlogService {

    @Autowired
    private BlogMapper blogMapper;

    @Override
    public IPage<BlogDTO> pageBlogInfo(BlogQO blogQO) {
        if(blogQO.getType() != null && !"".equals(blogQO.getType())){
            blogQO.setTypes(blogQO.getType().split(","));
        }
        if(blogQO.getColumnId() != null && !"".equals(blogQO.getColumnId())){
            blogQO.setColumnIds(blogQO.getColumnId().split(","));
        }

        PageDefaultImpl<BlogDTO> page = new PageDefaultImpl<>();

        PageHelper.startPage(blogQO.getPageIndex(),blogQO.getPageSize());
        PageInfo<BlogDTO> pageInfo = new PageInfo<>(blogMapper.pageBlogInfo(blogQO));

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
    public String updateBlogInfo(BlogDTO blogDTO) {

        if(blogDTO.getBlogId() != null && !"".equals(blogDTO.getBlogId())){
            blogDTO.setBlogIds(blogDTO.getBlogId().split(","));
        }

        blogMapper.updateBlogInfo(blogDTO);

        return "success";
    }

    @Override
    public IPage<BlogDTO> pageBlogInfoByColl(BlogQO blogQO) {
        PageDefaultImpl<BlogDTO> page = new PageDefaultImpl<>();

        PageHelper.startPage(blogQO.getPageIndex(),blogQO.getPageSize());
        PageInfo<BlogDTO> pageInfo = new PageInfo<>(blogMapper.pageBlogInfoByColl(blogQO));

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
    public IPage<BlogDTO> pageBlogInfoByView(BlogQO blogQO) {
        PageDefaultImpl<BlogDTO> page = new PageDefaultImpl<>();

        PageHelper.startPage(blogQO.getPageIndex(),blogQO.getPageSize());
        PageInfo<BlogDTO> pageInfo = new PageInfo<>(blogMapper.pageBlogInfoByView(blogQO));

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
}
