package com.tao.yeblog_user.model.dto;

import lombok.Data;

/**
 * 事项信息DTO
 */
@Data
public class ScheduleDTO {

    private String scheduleId;  //事项id

    private String[] scheduleIds;  //事项id数组

    private String userId; //用户Id

    private String title;   //标题

    private String content; //内容

    private String type; //类型

    private String createTime; //创建时间

    private String finishTime; //完成时间

}
