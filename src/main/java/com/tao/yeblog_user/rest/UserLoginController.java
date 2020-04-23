package com.tao.yeblog_user.rest;

import com.tao.yeblog_user.common.Response;
import com.tao.yeblog_user.model.dto.AdminUserDTO;
import com.tao.yeblog_user.model.dto.UserDTO;
import com.tao.yeblog_user.model.qo.AdminUserQO;
import com.tao.yeblog_user.model.qo.UserQO;
import com.tao.yeblog_user.service.IAdminUserService;
import com.tao.yeblog_user.service.IUserService;
import com.tao.yeblog_user.utils.IpUtil;
import com.tao.yeblog_user.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

/**
 * 用户登录Controller
 */
@RestController
@RequestMapping("/back/userLoginServices")
public class UserLoginController {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private IUserService userService;

    /**
     * 登录接口
     * @param userQO
     * @param request
     * @return
     */
    @PostMapping("/userLogin")
    public Response<UserDTO> login(@RequestBody UserQO userQO, HttpServletRequest request) throws ParseException {
        //通过用户名和密码获得用户信息
        UserDTO userDTO = userService.getUserInfo(userQO);

        //用户名和密码错误
        if(userDTO == null){
            return new Response<>("601", "用户名或密码有误,请重新输入");
        }

        //更新ip和时间
        String ip = IpUtil.getIpAddr(request);
        UserDTO updateInfo = new UserDTO();
        updateInfo.setLogIp(ip);
        updateInfo.setLogTime("update");
        updateInfo.setLoginId(userDTO.getLoginId());
        updateInfo.setPassword(userDTO.getPassword());

        //自动解禁
        if("0".equals(userDTO.getEnable())){
            long unableTime = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").parse(userDTO.getUnableTime()).getTime();

            long nowTime = new Date().getTime();

            if(nowTime >= unableTime){
                updateInfo.setEnable("1");
            }
        }

        userService.updateUserInfo(updateInfo);

        //获取token
        String token = jwtUtil.getToken(userDTO.getLoginId(), userDTO.getName(), new HashMap<>());
        userDTO.setToken(token);

        return Response.successData(userDTO);
    }

    /**
     * 检查登录
     * @param
     * @return
     */
    @RequestMapping("/checkLogin")
    public Response<UserDTO> checkLogin(HttpServletRequest request){
        String header = request.getHeader("Authorization");

        String token = header.substring(3);

        //解析token
        Claims claims = jwtUtil.parseToken(token);

        UserQO userQO = new UserQO();
        userQO.setLoginId(claims.getId());

        return Response.successData(userService.getUserInfo(userQO));
    }

    /**
     * 检查登录2
     * @param
     * @return
     */
    @RequestMapping("/checkLogin2")
    public Response<UserDTO> checkLogin2(HttpServletRequest request){
        String header = request.getHeader("Authorization");

        String token = header.substring(3);

        //解析token
        Claims claims = jwtUtil.parseToken(token);

        UserQO userQO = new UserQO();
        userQO.setLoginId(claims.getId());

        return Response.successData(userService.getUserInfo(userQO));
    }


    @RequestMapping("/test")
    public Response<String> test(){

        return Response.successData("Tewst");
    }


}
