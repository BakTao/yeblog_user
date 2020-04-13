package com.tao.yeblog_user.dao;

import com.github.pagehelper.Page;
import com.tao.yeblog_user.model.dto.BlogDTO;
import com.tao.yeblog_user.model.qo.BlogQO;
import org.apache.ibatis.annotations.Mapper;

/**
 * 博客管理Mapper
 */
@Mapper
public interface BlogMapper {

    /**
     * 获取博客信息
     * @param blogQO
     * @return
     */
    Page<BlogDTO> pageBlogInfo(BlogQO blogQO);

    /**
     * 更新博客信息
     * @param blogDTO
     * @return
     */
    void updateBlogInfo(BlogDTO blogDTO);

    /**
     * 获取前10收藏博客信息
     * @param blogQO
     * @return
     */
    Page<BlogDTO> pageBlogInfoByColl(BlogQO blogQO);


    /**
     * 获取前6点赞博客信息
     * @param blogQO
     * @return
     */
    Page<BlogDTO> pageBlogInfoByView(BlogQO blogQO);

    /**
     * 获取前15新博客信息
     * @param blogQO
     * @return
     */
    Page<BlogDTO> pageBlogInfoByNew(BlogQO blogQO);
}
