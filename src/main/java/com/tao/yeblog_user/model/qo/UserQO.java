package com.tao.yeblog_user.model.qo;

import com.tao.yeblog_user.common.BasePage;
import lombok.Data;

/**
 * 用户信息QO
 */
@Data
public class UserQO extends BasePage {

    private String name;    //名字

    private String loginId; //登录Id

    private String sex;     //性别

    private String phone;   //手机号码

    private String email;   //邮箱

    private String enable; //是否有效

    private String regTimeQ;   //注册时间起

    private String regTimeZ;   //注册时间止

    private String blogType;   //博客类型

    private String blogCountQ;   //博客数起

    private String blogCountZ;   //博客数止

}
