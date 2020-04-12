package com.tao.yeblog_user.rest;

import com.tao.yeblog_user.common.Response;
import com.tao.yeblog_user.model.dto.AdminUserDTO;
import com.tao.yeblog_user.model.qo.AdminUserQO;
import com.tao.yeblog_user.service.IAdminUserService;
import com.tao.yeblog_user.utils.IpUtil;
import com.tao.yeblog_user.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;

/**
 * 用户登录Controller
 */
@RestController
@RequestMapping("/back/loginServices")
public class AmdinLoginController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private IAdminUserService adminUserService;

    /**
     * 登录接口
     * @param adminUserQO
     * @param request
     * @return
     */
    @PostMapping("/adminLogin")
    public Response<AdminUserDTO> login(@RequestBody AdminUserQO adminUserQO, HttpServletRequest request){
        //通过用户名和密码获得用户信息
        AdminUserDTO adminUserDTO = adminUserService.getAdminUserInfo(adminUserQO);

        //用户名和密码错误
        if(adminUserDTO == null){
            return new Response<>("601", "用户名或密码有误,请重新输入");
        }

        //更新ip和时间
        String ip = IpUtil.getIpAddr(request);
        AdminUserDTO updateInfo = new AdminUserDTO();
        updateInfo.setLogIp(ip);
        updateInfo.setLogTime("update");
        updateInfo.setLoginId(adminUserQO.getLoginId());
        updateInfo.setPassword(adminUserQO.getPassword());
        adminUserService.updateAdminUserInfo(updateInfo);

        //获取token
        String token = jwtUtil.getToken(adminUserDTO.getLoginId(), adminUserDTO.getName(), new HashMap<>());
        adminUserDTO.setToken(token);

        return Response.successData(adminUserDTO);
    }


    @RequestMapping("/test")
    public Response<String> test(){

        return Response.successData("Tewst");
    }


}
