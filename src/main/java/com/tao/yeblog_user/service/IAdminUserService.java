package com.tao.yeblog_user.service;

import com.tao.yeblog_user.model.dto.AdminUserDTO;
import com.tao.yeblog_user.model.qo.AdminUserQO;

/**
 * 管理员登录Service
 */
public interface IAdminUserService {

    /**
     * 获得用户信息
     * @param adminUserQO
     * @return
     */
    AdminUserDTO getAdminUserInfo(AdminUserQO adminUserQO);

    /**
     * 更新用户信息
     * @param adminUserDTO
     */
    String updateAdminUserInfo(AdminUserDTO adminUserDTO);
}
