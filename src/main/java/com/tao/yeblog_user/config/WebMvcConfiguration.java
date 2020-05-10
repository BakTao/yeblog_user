package com.tao.yeblog_user.config;

import com.alibaba.fastjson.JSONObject;
import com.tao.yeblog_user.dao.UserMapper;
import com.tao.yeblog_user.model.dto.UserDTO;
import com.tao.yeblog_user.model.qo.UserQO;
import com.tao.yeblog_user.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurationSupport;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 * 配置类
 */
@Configuration
public class WebMvcConfiguration extends WebMvcConfigurationSupport {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserMapper userMapper;

    @Bean
    public UserLoginInterceptor getUserLoginInterceptor(){
        return new UserLoginInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(getUserLoginInterceptor()).addPathPatterns(
                "/back/userLoginServices/checkLogin"
                ,"/back/shopServices/checkShopCar"
                ,"/back/commentServices/createComment"
                ,"/back/commentServices/deleteComment"
                ,"/back/commentServices/createReplyComment"
                ,"/back/commentServices/deleteReplyComment"
                ,"/back/blogServices/createBlogCollection"
                ,"/back/blogServices/deleteBlogCollection"
                ,"/back/commentServices/createCommentPraise"
                ,"/back/commentServices/deleteCommentPraise"
                ,"/back/blogServices/createBlog"
                ,"/back/userServices/updateUserInfo"
                ,"/back/blogServices/deleteBlog"
                ,"/back/scheduleServices/createSchedule"
                ,"/back/orderServices/pageOrderInfo"
                ,"/back/shopServices/createShopCar"
                ,"/back/shopServices/listShopCarInfo"
                ,"/back/shopServices/deleteShopCar"
                ,"/back/shopServices/updateShopCarInfo"
        );
        registry.addInterceptor(getUserLoginInterceptor2()).addPathPatterns(
                "/back/userLoginServices/checkLogin2"
        );


    }

    @Bean
    public UserLoginInterceptor2 getUserLoginInterceptor2(){
        return new UserLoginInterceptor2();
    }

    protected class UserLoginInterceptor extends HandlerInterceptorAdapter {
        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
            String header = request.getHeader("Authorization");

            if(header == null || !header.startsWith("ym:")){
                response.setStatus(602);
                response.sendError(602, "用户未登录,请重新登录");
                return false;
            }

            String token = header.substring(3);

            Claims claims = null;
            try{
                //解析token
                claims = jwtUtil.parseToken(token);
            }catch (Exception e){
                response.setStatus(603);
                response.sendError(603, "登录信息过期，请重新登录");
                return false;
            }

            if(claims == null){
                response.setStatus(602);
                response.sendError(602, "用户未登录,请重新登录");
                return false;
            }

            String userId = claims.getId();

            UserQO userQO = new UserQO();
            userQO.setLoginId(userId);

            UserDTO userInfo = userMapper.getUserInfo(userQO);
            if("0".equals(userInfo.getEnable())){
                response.sendError(605, "用户被封禁,封禁时间到:" + userInfo.getUnableTime());
                return false;
            }

            HttpSession session = request.getSession();
            JSONObject json = new JSONObject();
            json.put("loginId", userId);
            // 将认证码存入SESSION
            session.setAttribute("UserInfo", json);

            return true;
        }
    }

    protected class UserLoginInterceptor2 extends HandlerInterceptorAdapter {
        @Override
        public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
            String header = request.getHeader("Authorization");

            if(header == null || !header.startsWith("ym:")){
                response.setStatus(602);
                response.sendError(602, "用户未登录,请重新登录");
                return false;
            }

            String token = header.substring(3);

            Claims claims = null;
            try{
                //解析token
                claims = jwtUtil.parseToken(token);
            }catch (Exception e){
                response.setStatus(603);
                response.sendError(603, "登录信息过期，请重新登录");
                return false;
            }

            if(claims == null){
                response.setStatus(602);
                response.sendError(602, "用户未登录,请重新登录");
                return false;
            }
            String userId = claims.getId();
            HttpSession session = request.getSession();
            JSONObject json = new JSONObject();
            json.put("loginId", userId);
            // 将认证码存入SESSION
            session.setAttribute("UserInfo", json);
            return true;
        }
    }

//    @Bean
//    public CorsFilter corsFilter() {
//        //1.添加CORS配置信息
//        CorsConfiguration config = new CorsConfiguration();
//        //放行哪些原始域
//        config.addAllowedOrigin("*");
//        //是否发送Cookie信息
//        config.setAllowCredentials(true);
//        //放行哪些原始域(请求方式)
//        config.addAllowedMethod("*");
//        //放行哪些原始域(头部信息)
//        config.addAllowedHeader("*");

//        //2.添加映射路径
//        UrlBasedCorsConfigurationSource configSource = new UrlBasedCorsConfigurationSource();
//        configSource.registerCorsConfiguration("/**", config);
//
//        //3.返回新的CorsFilter.
//        return new CorsFilter(configSource);
//    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        //告知系统static 当成 静态资源访问
        registry.addResourceHandler("/static/**").addResourceLocations("classpath:/static/");
    }

}
