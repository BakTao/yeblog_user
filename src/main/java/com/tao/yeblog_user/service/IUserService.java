package com.tao.yeblog_user.service;

import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.model.dto.AdminUserDTO;
import com.tao.yeblog_user.model.dto.UserDTO;
import com.tao.yeblog_user.model.qo.AdminUserQO;
import com.tao.yeblog_user.model.qo.UserQO;

/**
 * 用户管理Service
 */
public interface IUserService {

    /**
     * 获取用户信息
     * @param userQO
     * @return
     */
    IPage<UserDTO> pageUserInfo(UserQO userQO);

    /**
     * 更新用户信息
     * @param userDTO
     * @return
     */
    String updateUserInfo(UserDTO userDTO);

    /**
     * 获得用户信息
     * @param userQO
     * @return
     */
    UserDTO getUserInfo(UserQO userQO);

    /**
     * 创建用户信息
     * @param userDTO
     * @return
     */
    void createUser(UserDTO userDTO);
}
