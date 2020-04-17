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

    @RequestMapping("/schedule")
    public String schedule(){
        return "schedule";
    }

    @RequestMapping("/article/{articleId}")
    public String article(){
        return "article";
    }

    @RequestMapping("/room/{userId}")
    public String room(){
        return "room";
    }

    @RequestMapping("/createBlog")
    public String createBlog(){
        return "createBlog";
    }

    @RequestMapping("/login")
    public String login(){
        return "login";
    }

}
