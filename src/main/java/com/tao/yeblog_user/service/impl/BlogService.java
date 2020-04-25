package com.tao.yeblog_user.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.common.PageDefaultImpl;
import com.tao.yeblog_user.common.Pager;
import com.tao.yeblog_user.dao.BlogMapper;
import com.tao.yeblog_user.model.dto.BlogDTO;
import com.tao.yeblog_user.model.dto.FileDTO;
import com.tao.yeblog_user.model.qo.BlogQO;
import com.tao.yeblog_user.service.IBlogService;
import com.tao.yeblog_user.utils.IpUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class BlogService implements  IBlogService {

    @Autowired
    private BlogMapper blogMapper;

    @Autowired
    private UploadService uploadService;

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
    public IPage<BlogDTO> pageCollectionBlog(BlogQO blogQO) {
        if(blogQO.getType() != null && !"".equals(blogQO.getType())){
            blogQO.setTypes(blogQO.getType().split(","));
        }
        if(blogQO.getColumnId() != null && !"".equals(blogQO.getColumnId())){
            blogQO.setColumnIds(blogQO.getColumnId().split(","));
        }

        PageDefaultImpl<BlogDTO> page = new PageDefaultImpl<>();

        PageHelper.startPage(blogQO.getPageIndex(),blogQO.getPageSize());
        PageInfo<BlogDTO> pageInfo = new PageInfo<>(blogMapper.pageCollectionBlog(blogQO));

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

        if(blogDTO.getCover() != null && !"".equals(blogDTO.getCover())){
            BlogQO blogQO = new BlogQO();
            blogQO.setBlogId(blogDTO.getBlogId());
            BlogDTO data = blogMapper.getBlogCover(blogQO);

            if(data.getCover() != null && !"".equals(data.getCover())){
                FileDTO fileDTO = new FileDTO();
                fileDTO.setFileId(data.getCover());
                fileDTO.setFileName("file/" + data.getFileName().substring(data.getFileName().lastIndexOf("/")+1));

                uploadService.deleteUploadFile(fileDTO);
            }
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

    @Override
    public IPage<BlogDTO> pageBlogInfoByNew(BlogQO blogQO) {
        PageDefaultImpl<BlogDTO> page = new PageDefaultImpl<>();

        PageHelper.startPage(blogQO.getPageIndex(),blogQO.getPageSize());
        PageInfo<BlogDTO> pageInfo = new PageInfo<>(blogMapper.pageBlogInfoByNew(blogQO));

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
    public String createBlog(BlogDTO blogDTO) {
        String blogId = "b" + blogDTO.getType() + new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());
        blogDTO.setBlogId(blogId);
        blogMapper.createBlog(blogDTO);
        return "success";
    }

    @Override
    public String deleteBlog(BlogDTO blogDTO) {
        BlogQO blogQO = new BlogQO();
        blogQO.setBlogId(blogDTO.getBlogId());
        BlogDTO data = blogMapper.getBlogCover(blogQO);

        if(data.getCover() != null && !"".equals(data.getCover())){
            FileDTO fileDTO = new FileDTO();
            fileDTO.setFileId(data.getCover());
            fileDTO.setFileName("file/" + data.getFileName().substring(data.getFileName().lastIndexOf("/")+1));

            uploadService.deleteUploadFile(fileDTO);
        }
        blogMapper.deleteBlog(blogDTO);
        return "success";
    }

    @Override
    public String createBlogView(BlogDTO blogDTO, HttpServletRequest request) {
        String ip = IpUtil.getIpAddr(request);
        BlogQO blogQO = new BlogQO();
        blogQO.setIp(ip);
        blogQO.setBlogId(blogDTO.getBlogId());

        BlogDTO data = blogMapper.getBlogView(blogQO);
        if(data == null){
            blogDTO.setIp(ip);
            blogMapper.createBlogView(blogDTO);
            return "success";
        }else{
            return "no update";
        }
    }

    @Override
    public String createBlogCollection(BlogDTO blogDTO) {
        blogMapper.createBlogCollection(blogDTO);
        return "success";
    }

    @Override
    public String deleteBlogCollection(BlogDTO blogDTO) {
        blogMapper.deleteBlogCollection(blogDTO);
        return "success";
    }
}
