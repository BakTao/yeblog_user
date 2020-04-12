package com.tao.yeblog_user;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@SpringBootApplication
public class YeblogUserApplication {

    public static void main(String[] args) {
        SpringApplication.run(YeblogUserApplication.class, args);
    }

}
