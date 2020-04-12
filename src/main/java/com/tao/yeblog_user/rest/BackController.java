package com.tao.yeblog_user.rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class BackController {

    @RequestMapping("/")
    public String index(){
        return "index";
    }

    @RequestMapping("/column")
    public String column(){
        return "column";
    }

    @RequestMapping("/shop")
    public String shop(){
        return "shop";
    }

    @RequestMapping("/profile")
    public String profile(){
        return "profile";
    }

    @RequestMapping("/set")
    public String set(){
        return "set";
    }

    @RequestMapping("/article")
    public String article(){
        return "article";
    }


    @RequestMapping("/test")
    public String test(){
        return "test";
    }
}
