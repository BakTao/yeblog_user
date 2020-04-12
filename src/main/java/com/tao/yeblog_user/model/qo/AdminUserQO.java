package com.tao.yeblog_user.model.qo;

import lombok.Data;

/**
 * 管理员信息QO
 */
@Data
public class AdminUserQO{

    private String loginId;     //登录id

    private String password;    //密码

    private String name;        //名称

    private String lastLogIp;   //上次登录ip

    private String lastLogTime; //上次登录时间

    private String token;       //登录令牌

    private String logIp;   //本次登录ip

    private String logTime; //本次登录时间

}
