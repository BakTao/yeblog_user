package com.tao.yeblog_user.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 管理员信息DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AdminUserDTO {
    private String loginId;     //登录id

    private String password;    //密码

    private String newPassword;    //新密码

    private String name;        //名称

    private String lastLogIp;   //上次登录ip

    private String lastLogTime; //上次登录时间

    private String token;       //登录令牌

    private String logIp;   //本次登录ip

    private String logTime; //本次登录时间

}
