package com.tao.yeblog_user.rest;

import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.common.Response;
import com.tao.yeblog_user.model.dto.BlogDTO;
import com.tao.yeblog_user.model.qo.BlogQO;
import com.tao.yeblog_user.service.IBlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * 博客管理Controller
 */
@RestController
@RequestMapping("/back/blogServices")
public class BlogController {

    @Autowired
    private IBlogService blogService;

    /**
     * 获取博客信息
     * @param blogQO
     * @return
     */
    @PostMapping("/pageBlogInfo")
    public Response<IPage<BlogDTO>> pageBlogInfo(@RequestBody BlogQO blogQO){
        return Response.successData(blogService.pageBlogInfo(blogQO));
    }

    /**
     * 获取用户的收藏博客信息
     * @param blogQO
     * @return
     */
    @PostMapping("/pageCollectionBlog")
    public Response<IPage<BlogDTO>> pageCollectionBlog(@RequestBody BlogQO blogQO){
        return Response.successData(blogService.pageCollectionBlog(blogQO));
    }

    /**
     * 更新博客信息
     * @param blogDTO
     * @return
     */
    @PostMapping("/updateBlogInfo")
    public Response<String> updateBlogInfo(@RequestBody BlogDTO blogDTO){
        return Response.successData(blogService.updateBlogInfo(blogDTO));
    }

    /**
     * 获取前10收藏博客信息
     * @param blogQO
     * @return
     */
    @PostMapping("/pageBlogInfoByColl")
    public Response<IPage<BlogDTO>> pageBlogInfoByColl(@RequestBody BlogQO blogQO){
        return Response.successData(blogService.pageBlogInfoByColl(blogQO));
    }

    /**
     * 获取前6观看博客信息
     * @param blogQO
     * @return
     */
    @PostMapping("/pageBlogInfoByView")
    public Response<IPage<BlogDTO>> pageBlogInfoByView(@RequestBody BlogQO blogQO){
        return Response.successData(blogService.pageBlogInfoByView(blogQO));
    }

    /**
     * 获取前15新博客信息
     * @param blogQO
     * @return
     */
    @PostMapping("/pageBlogInfoByNew")
    public Response<IPage<BlogDTO>> pageBlogInfoByNew(@RequestBody BlogQO blogQO){
        return Response.successData(blogService.pageBlogInfoByNew(blogQO));
    }

    /**
     * 新增博客信息
     * @param blogDTO
     * @return
     */
    @PostMapping("/createBlog")
    public Response<String> createBlog(@RequestBody BlogDTO blogDTO){
        return Response.successData(blogService.createBlog(blogDTO));
    }

    /**
     * 删除博客信息
     * @param blogDTO
     * @return
     */
    @PostMapping("/deleteBlog")
    public Response<String> deleteBlog(@RequestBody BlogDTO blogDTO){
        return Response.successData(blogService.deleteBlog(blogDTO));
    }

    /**
     * 新增博客点击
     * @param blogDTO
     * @return
     */
    @PostMapping("/createBlogView")
    public Response<String> createBlogView(@RequestBody BlogDTO blogDTO, HttpServletRequest request){
        return Response.successData(blogService.createBlogView(blogDTO, request));
    }

    /**
     * 新增博客收藏
     * @param blogDTO
     * @return
     */
    @PostMapping("/createBlogCollection")
    public Response<String> createBlogCollection(@RequestBody BlogDTO blogDTO){
        return Response.successData(blogService.createBlogCollection(blogDTO));
    }

    /**
     * 删除博客收藏
     * @param blogDTO
     * @return
     */
    @PostMapping("/deleteBlogCollection")
    public Response<String> deleteBlogCollection(@RequestBody BlogDTO blogDTO){
        return Response.successData(blogService.deleteBlogCollection(blogDTO));
    }
}
