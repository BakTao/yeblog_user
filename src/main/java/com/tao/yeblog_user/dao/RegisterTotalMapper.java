package com.tao.yeblog_user.dao;

import com.tao.yeblog_user.model.dto.RegisterChartsDTO;
import com.tao.yeblog_user.model.qo.RegisterChartsQO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 注册量统计Mapper
 */
@Mapper
public interface RegisterTotalMapper {

    /**
     * 通过年获取注册量
     * @param registerChartsQO
     * @return
     */
    List<RegisterChartsDTO> getRegisterCountByYear(RegisterChartsQO registerChartsQO);

    /**
     * 通过月获取注册量
     * @param registerChartsQO
     * @return
     */
    List<RegisterChartsDTO> getRegisterCountByMonth(RegisterChartsQO registerChartsQO);

    /**
     * 通过天获取注册量
     * @param registerChartsQO
     * @return
     */
    List<RegisterChartsDTO> getRegisterCountByDay(RegisterChartsQO registerChartsQO);

    /**
     * 通过周获取注册量
     * @param registerChartsQO
     * @return
     */
    List<RegisterChartsDTO> getRegisterCountByWeek(RegisterChartsQO registerChartsQO);
}
