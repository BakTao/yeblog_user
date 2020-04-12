package com.tao.yeblog_user.rest;

import com.tao.yeblog_user.common.Response;
import com.tao.yeblog_user.model.dto.AdminUserDTO;
import com.tao.yeblog_user.model.qo.AdminUserQO;
import com.tao.yeblog_user.service.IAdminUserService;
import com.tao.yeblog_user.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

/**
 * 管理员用户Controller
 */
@RestController
@RequestMapping("/back/adminUserServices")
public class AdminUserController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private IAdminUserService adminUserService;

    /**
     * 获取用户信息
     * @param
     * @return
     */
    @PostMapping("/getAdminUserInfo")
    public Response<AdminUserDTO> getAdminUserInfo(HttpServletRequest request){
        String header = request.getHeader("Authorization");

        String token = header.substring(3);

        //解析token
        Claims claims = jwtUtil.parseToken(token);

        AdminUserQO adminUserQO = new AdminUserQO();
        adminUserQO.setLoginId(claims.getId());

        return Response.successData(adminUserService.getAdminUserInfo(adminUserQO));
    }

    /**
     * 更新用户信息
     * @param adminUserDTO
     * @return
     */
    @PostMapping("/updateAdminUserInfo")
    public Response<String> updateAdminUserInfo(@RequestBody AdminUserDTO adminUserDTO){
        AdminUserQO adminUserQO = new AdminUserQO();
        adminUserQO.setLoginId(adminUserDTO.getLoginId());
        adminUserQO.setPassword(adminUserDTO.getPassword());
        AdminUserDTO adminUserInfo = adminUserService.getAdminUserInfo(adminUserQO);

        //密码错误
        if(adminUserInfo == null){
            return new Response<>("601", "密码有误,请重新输入");
        }

        return Response.successData(adminUserService.updateAdminUserInfo(adminUserDTO));
    }

}
