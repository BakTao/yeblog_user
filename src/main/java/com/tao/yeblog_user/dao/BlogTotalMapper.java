package com.tao.yeblog_user.dao;

import com.tao.yeblog_user.model.dto.BlogChartsDTO;
import com.tao.yeblog_user.model.qo.BlogChartsQO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 博客量统计Mapper
 */
@Mapper
public interface BlogTotalMapper {

    /**
     * 通过年获取博客量(按博客类型)
     * @param blogChartsQO
     * @return
     */
    List<BlogChartsDTO> getBlogCountBylxByYear(BlogChartsQO blogChartsQO);

    /**
     * 通过月获取博客量(按博客类型)
     * @param blogChartsQO
     * @return
     */
    List<BlogChartsDTO> getBlogCountBylxByMonth(BlogChartsQO blogChartsQO);

    /**
     * 通过天获取博客量(按博客类型)
     * @param
     * @return
     */
    List<BlogChartsDTO> getBlogCountByWeek();

    /**
     * 通过天获取博客量(按博客类型)
     * @param blogChartsQO
     * @return
     */
    List<BlogChartsDTO> getBlogCountBylxByDay(BlogChartsQO blogChartsQO);

    /**
     * 通过年获取博客量(按是否有效)
     * @param blogChartsQO
     * @return
     */
    List<BlogChartsDTO> getBlogCountByyxByYear(BlogChartsQO blogChartsQO);

    /**
     * 通过月获取博客量(按是否有效)
     * @param blogChartsQO
     * @return
     */
    List<BlogChartsDTO> getBlogCountByyxByMonth(BlogChartsQO blogChartsQO);

    /**
     * 通过天获取博客量(按是否有效)
     * @param blogChartsQO
     * @return
     */
    List<BlogChartsDTO> getBlogCountByyxByDay(BlogChartsQO blogChartsQO);

    /**
     * 获取博客量(按专栏名称)
     * @param blogChartsQO
     * @return
     */
    List<BlogChartsDTO> getBlogCountByColumn(BlogChartsQO blogChartsQO);

    /**
     * 获取博客量(非草稿有效)
     * @param
     * @return
     */
    List<BlogChartsDTO> getBlogCountByOne();
}
