package com.tao.yeblog_user.service;

import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.model.dto.ScheduleDTO;
import com.tao.yeblog_user.model.qo.ScheduleQO;

/**
 * 事项管理Service
 */
public interface IScheduleService {

    /**
     * 获取事项信息
     * @param scheduleQO
     * @return
     */
    IPage<ScheduleDTO> pageScheduleInfo(ScheduleQO scheduleQO);

    /**
     * 更新事项信息
     * @param scheduleDTO
     * @return
     */
    String updateScheduleInfo(ScheduleDTO scheduleDTO);

    /**
     * 删除事项信息
     * @param scheduleDTO
     * @return
     */
    String deleteSchedule(ScheduleDTO scheduleDTO);

}
