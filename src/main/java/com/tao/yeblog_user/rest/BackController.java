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

    @RequestMapping("/column/{columnId}")
    public String columnId(){
        return "columnId";
    }

    @RequestMapping("/shop")
    public String shop(){
        return "shop";
    }

    @RequestMapping("/profile")
    public String profile(){
        return "profile";
    }

    @RequestMapping("/order")
    public String order(){
        return "order";
    }

    @RequestMapping("/shopCar")
    public String shopCar(){
        return "shopCar";
    }

    @RequestMapping("/order/{orederId}")
    public String showOrder(){
        return "showOrder";
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

    @RequestMapping("/editBlog/{blogId}")
    public String editBlog(){
        return "editBlog";
    }

    @RequestMapping("/login")
    public String login(){
        return "login";
    }

    @RequestMapping("/register")
    public String register(){
        return "register";
    }

    @RequestMapping("/forget")
    public String forget(){
        return "forget";
    }

    @RequestMapping("/404")
    public String notFound(){
        return "404";
    }

}
