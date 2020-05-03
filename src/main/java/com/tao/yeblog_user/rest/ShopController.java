package com.tao.yeblog_user.rest;

import com.alibaba.fastjson.JSONObject;
import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.common.Response;
import com.tao.yeblog_user.model.dto.SelectDTO;
import com.tao.yeblog_user.model.dto.ShopDTO;
import com.tao.yeblog_user.model.qo.ShopQO;
import com.tao.yeblog_user.service.IShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 商城管理Controller
 */
@RestController
@RequestMapping("/back/shopServices")
public class ShopController {

    @Autowired
    private IShopService shopService;

    /**
     * 获取商品信息
     * @param shopQO
     * @return
     */
    @RequestMapping("/pageShopInfo")
    public Response<IPage<ShopDTO>> pageShopInfo(@RequestBody ShopQO shopQO){
        return Response.successData(shopService.pageShopInfo(shopQO));
    }

    /**
     * 获取类别信息
     * @param
     * @return
     */
    @PostMapping("/listCategoryInfo")
    public Response<List<SelectDTO>> listCategoryInfo(){
        return Response.successData(shopService.listCategoryInfo());
    }

    /**
     * 新增类别信息
     * @param shopDTO
     * @return
     */
    @PostMapping("/createCategory")
    public Response<String> createCategory(@RequestBody ShopDTO shopDTO){
        return Response.successData(shopService.createCategory(shopDTO));
    }

    /**
     * 删除类别信息
     * @param shopDTO
     * @return
     */
    @PostMapping("/deleteCategory")
    public Response deleteCategory(@RequestBody ShopDTO shopDTO){
        if(shopDTO.getCategoryId() == null || "".equals(shopDTO.getCategoryId())){
            return new Response<>("001","类别ID不能为空");
        }
        return Response.successData(shopService.deleteCategory(shopDTO));
    }

    /**
     * 更新商品信息
     * @param shopDTO
     * @return
     */
    @PostMapping("/updateShopInfo")
    public Response<String> updateShopInfo(@RequestBody ShopDTO shopDTO){
        return Response.successData(shopService.updateShopInfo(shopDTO));
    }

    /**
     * 新增商品信息
     * @param shopDTO
     * @return
     */
    @PostMapping("/createShop")
    public Response<String> createShop(@RequestBody ShopDTO shopDTO){
        return Response.successData(shopService.createShop(shopDTO));
    }

    /**
     * 获取购物车信息
     * @param shopQO
     * @return
     */
    @PostMapping("/listShopCarInfo")
    public Response<List<ShopDTO>> listShopCarInfo(@RequestBody ShopQO shopQO, HttpServletRequest request){
        JSONObject json = (JSONObject)request.getSession().getAttribute("UserInfo");
        shopQO.setUserId(json.getString("loginId"));
        return Response.successData(shopService.listShopCarInfo(shopQO));
    }

    /**
     * 删除购物车信息
     * @param shopDTO
     * @return
     */
    @PostMapping("/deleteShopCar")
    public Response deleteShopCar(@RequestBody ShopDTO shopDTO, HttpServletRequest request){
        JSONObject json = (JSONObject)request.getSession().getAttribute("UserInfo");
        shopDTO.setUserId(json.getString("loginId"));

        if(shopDTO.getUserId() == null || "".equals(shopDTO.getUserId())){
            return new Response<>("001","用户ID不能为空");
        }
        if(shopDTO.getGoodsId() == null || "".equals(shopDTO.getGoodsId())){
            return new Response<>("002","商品ID不能为空");
        }
        return Response.successData(shopService.deleteShopCar(shopDTO));
    }

    /**
     * 添加购物车信息
     * @param shopDTO
     * @return
     */
    @PostMapping("/createShopCar")
    public Response createShopCar(@RequestBody ShopDTO shopDTO, HttpServletRequest request){
        JSONObject json = (JSONObject)request.getSession().getAttribute("UserInfo");
        shopDTO.setUserId(json.getString("loginId"));
        return Response.successData(shopService.createShopCar(shopDTO));
    }

    /**
     * 更新购物车信息
     * @param shopDTO
     * @return
     */
    @PostMapping("/updateShopCarInfo")
    public Response updateShopCarInfo(@RequestBody ShopDTO shopDTO, HttpServletRequest request){
        JSONObject json = (JSONObject)request.getSession().getAttribute("UserInfo");
        shopDTO.setUserId(json.getString("loginId"));
        return Response.successData(shopService.updateShopCarInfo(shopDTO));
    }

    /**
     * 检查购物车信息
     * @param shopQO
     * @return
     */
    @PostMapping("/checkShopCar")
    public Response checkShopCar(@RequestBody ShopQO shopQO, HttpServletRequest request){
        JSONObject json = (JSONObject)request.getSession().getAttribute("UserInfo");
        shopQO.setUserId(json.getString("loginId"));
        return Response.successData(shopService.checkShopCar(shopQO));
    }

}
