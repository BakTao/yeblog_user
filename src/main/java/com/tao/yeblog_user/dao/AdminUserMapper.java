package com.tao.yeblog_user.dao;

import com.tao.yeblog_user.model.dto.AdminUserDTO;
import com.tao.yeblog_user.model.qo.AdminUserQO;
import org.apache.ibatis.annotations.Mapper;

/**
 * 管理员登录Mapper
 */
@Mapper
public interface AdminUserMapper {

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
    void updateAdminUserInfo(AdminUserDTO adminUserDTO);
}
