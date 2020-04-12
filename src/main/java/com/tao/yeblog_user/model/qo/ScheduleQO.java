package com.tao.yeblog_user.model.qo;

import com.tao.yeblog_user.common.BasePage;
import lombok.Data;

/**
 * 博客信息QO
 */
@Data
public class ScheduleQO extends BasePage {

    private String scheduleId;  //事项id

    private String userId; //用户Id

    private String type; //类型

    private String[] types; //类型数组

    private String createTimeQ; //创建时间起

    private String createTimeZ; //创建时间止


}
