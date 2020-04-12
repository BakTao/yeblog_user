package com.tao.yeblog_user.service;

import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.common.Response;
import com.tao.yeblog_user.model.dto.BlogDTO;
import com.tao.yeblog_user.model.qo.BlogQO;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

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
}
