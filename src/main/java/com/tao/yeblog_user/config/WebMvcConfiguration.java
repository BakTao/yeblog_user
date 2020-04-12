package com.tao.yeblog_user.config;

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

/**
 * 配置类
 */
@Configuration
public class WebMvcConfiguration extends WebMvcConfigurationSupport {

    @Autowired
    private JwtUtil jwtUtil;

    @Bean
    public LoginInterceptor getLoginInterceptor(){
        return new LoginInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        //登录请求不拦截
//        registry.addInterceptor(getLoginInterceptor()).excludePathPatterns("/back/loginServices/adminLogin");
    }

    protected class LoginInterceptor extends HandlerInterceptorAdapter {
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
            }catch (ExpiredJwtException e){
                response.setStatus(603);
                response.sendError(603, "登录信息过期，请重新登录");
                return false;
            }

            if(claims == null){
                response.setStatus(602);
                response.sendError(602, "用户未登录,请重新登录");
                return false;
            }

            //String userId = claims.getId();

            //System.out.println(userId);
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
