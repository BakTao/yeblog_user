package com.tao.yeblog_user.rest;

import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.common.Response;
import com.tao.yeblog_user.model.dto.UserDTO;
import com.tao.yeblog_user.model.qo.UserQO;
import com.tao.yeblog_user.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 用户管理Controller
 */
@RestController
@RequestMapping("/back/userServices")
public class UserController {

    @Autowired
    private IUserService userService;

    /**
     * 获取用户信息
     * @param userQO
     * @return
     */
    @PostMapping("/pageUserInfo")
    public Response<IPage<UserDTO>> pageUserInfo(@RequestBody UserQO userQO){
        return Response.successData(userService.pageUserInfo(userQO));
    }

    /**
     * 更新用户信息
     * @param userDTO
     * @return
     */
    @PostMapping("/updateUserInfo")
    public Response<String> updateUserInfo(@RequestBody UserDTO userDTO){
        return Response.successData(userService.updateUserInfo(userDTO));
    }

}
