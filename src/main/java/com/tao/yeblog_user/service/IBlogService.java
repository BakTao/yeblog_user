package com.tao.yeblog_user.service;

import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.common.Response;
import com.tao.yeblog_user.model.dto.BlogDTO;
import com.tao.yeblog_user.model.qo.BlogQO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;

/**
 * 博客管理Service
 */
public interface IBlogService {

    /**
     * 获取用户信息
     * @param blogQO
     * @return
     */
    IPage<BlogDTO> pageBlogInfo(BlogQO blogQO);

    /**
     * 获取用户的收藏信息
     * @param blogQO
     * @return
     */
    IPage<BlogDTO> pageCollectionBlog(BlogQO blogQO);

    /**
     * 更新用户信息
     * @param blogDTO
     */
    String updateBlogInfo(BlogDTO blogDTO);

    /**
     * 获取前10收藏博客信息
     * @param blogQO
     * @return
     */
    IPage<BlogDTO> pageBlogInfoByColl(BlogQO blogQO);

    /**
     * 获取前6点赞博客信息
     * @param blogQO
     * @return
     */
    IPage<BlogDTO> pageBlogInfoByView(BlogQO blogQO);

    /**
     * 获取前15新博客信息
     * @param blogQO
     * @return
     */
    IPage<BlogDTO> pageBlogInfoByNew(BlogQO blogQO);

    /**
     * 新增用户信息
     * @param blogDTO
     * @return
     */
    String createBlog(BlogDTO blogDTO);

    /**
     * 删除用户信息
     * @param blogDTO
     * @return
     */
    String deleteBlog(BlogDTO blogDTO);

    /**
     * 新增用户信息
     * @param blogDTO
     * @return
     */
    String createBlogView(BlogDTO blogDTO, HttpServletRequest request);

    /**
     * 新增用户信息
     * @param blogDTO
     * @return
     */
    String createBlogCollection(BlogDTO blogDTO);

    /**
     * 删除用户信息
     * @param blogDTO
     * @return
     */
    String deleteBlogCollection(BlogDTO blogDTO);
}
