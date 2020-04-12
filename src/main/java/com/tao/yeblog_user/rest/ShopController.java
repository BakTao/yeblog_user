package com.tao.yeblog_user.rest;

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
}
