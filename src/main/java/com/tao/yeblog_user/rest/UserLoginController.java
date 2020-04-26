package com.tao.yeblog_user.rest;

import com.alibaba.fastjson.JSONObject;
import com.tao.yeblog_user.common.Response;
import com.tao.yeblog_user.model.dto.AdminUserDTO;
import com.tao.yeblog_user.model.dto.UserDTO;
import com.tao.yeblog_user.model.qo.AdminUserQO;
import com.tao.yeblog_user.model.qo.UserQO;
import com.tao.yeblog_user.service.IAdminUserService;
import com.tao.yeblog_user.service.IUserService;
import com.tao.yeblog_user.utils.IpUtil;
import com.tao.yeblog_user.utils.JwtUtil;
import com.zhenzi.sms.ZhenziSmsClient;
import io.jsonwebtoken.Claims;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * 用户登录Controller
 */
@RestController
@RequestMapping("/back/userLoginServices")
public class UserLoginController {

    @Value("${ZhenziSms.config.apiUrl}")
    private String apiUrl;

    @Value("${ZhenziSms.config.appId}")
    private String appId;

    @Value("${ZhenziSms.config.appSecret}")
    private String appSecret;

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

    /**
     * 获取验证码
     * @param request
     * @param phone
     * @return
     */
    @RequestMapping("/sendYzm")
    public Response sendSms(HttpServletRequest request, String phone) {
        try {
            JSONObject json = null;
            //生成6位验证码
            String verifyCode = String.valueOf(new Random().nextInt(899999) + 100000);
            //发送短信
            Map<String, String> params = new HashMap<>();
            params.put("message", "来自YeBlog：您的验证码" + verifyCode + "，该验证码5分钟内有效!");
            params.put("number", phone);
            ZhenziSmsClient client = new ZhenziSmsClient(apiUrl, appId, appSecret);
            String result = client.send(params);

            json = JSONObject.parseObject(result);
            if(json.getIntValue("code") != 0)//发送短信失败
                return new Response("800","发送失败");
            //将验证码存到session中,同时存入创建时间
            //以json存放，这里使用的是阿里的fastjson
            HttpSession session = request.getSession();
            json = new JSONObject();
            json.put("verifyCode", verifyCode);
            json.put("phone", phone);
            json.put("createTime", System.currentTimeMillis());
            // 将认证码存入SESSION
            session.setAttribute("verifyCode", json);
            return new Response("0","success");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    /**
     * 注册
     * @param request
     * @param userDTO
     * @return
     */
    @PostMapping("/register")
    public Response register(HttpServletRequest request, @RequestBody UserDTO userDTO) {
        UserQO userQO = new UserQO();
        userQO.setPhone(userDTO.getPhone());
        userQO.setLoginId(userDTO.getLoginId());
        UserDTO data = userService.getUserInfo(userQO);
        if(data != null){
            return new Response("808","用户名或手机号被占用");
        }

        JSONObject json = (JSONObject)request.getSession().getAttribute("verifyCode");
        if(json == null || json.getString("verifyCode") == null || json.getString("phone") == null || json.getString("createTime") == null){
            return new Response("804","系统错误,请稍后再试");
        }

        if(!json.getString("verifyCode").equals(userDTO.getVerifyCode())){
            return new Response("801","验证码错误");
        }
        if(!json.getString("phone").equals(userDTO.getPhone())){
            return new Response("803","手机号错误");
        }
        if((System.currentTimeMillis() - json.getLong("createTime")) > 1000 * 60 * 5){
            return new Response("802","验证码过期");
        }
        userService.createUser(userDTO);
        return new Response("0","success");
    }

    /**
     * 找回密码
     * @param request
     * @param userDTO
     * @return
     */
    @PostMapping("/forget")
    public Response forget(HttpServletRequest request, @RequestBody UserDTO userDTO) {
        UserQO userQO = new UserQO();
        userQO.setPhone(userDTO.getPhone());
        UserDTO data = userService.getUserInfo(userQO);
        if(data == null){
            return new Response("808","手机号未使用");
        }

        JSONObject json = (JSONObject)request.getSession().getAttribute("verifyCode");
        if(json == null || json.getString("verifyCode") == null || json.getString("phone") == null || json.getString("createTime") == null){
            return new Response("804","系统错误,请稍后再试");
        }

        if(!json.getString("verifyCode").equals(userDTO.getVerifyCode())){
            return new Response("801","验证码错误");
        }
        if(!json.getString("phone").equals(userDTO.getPhone())){
            return new Response("803","手机号错误");
        }
        if((System.currentTimeMillis() - json.getLong("createTime")) > 1000 * 60 * 5){
            return new Response("802","验证码过期");
        }
        userService.updateUserInfo(userDTO);
        return new Response("0","success");
    }
}
