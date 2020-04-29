package com.tao.yeblog_user.dao;

import com.github.pagehelper.Page;
import com.tao.yeblog_user.model.dto.SelectDTO;
import com.tao.yeblog_user.model.dto.ShopDTO;
import com.tao.yeblog_user.model.qo.ShopQO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 商城管理Mapper
 */
@Mapper
public interface ShopMapper {

    /**
     * 获取商品信息
     * @param shopQO
     * @return
     */
    Page<ShopDTO> pageShopInfo(ShopQO shopQO);


    /**
     * 获取类别信息
     * @param
     * @return
     */
    List<SelectDTO> listCategoryInfo();

    /**
     * 增加类别
     * @param shopDTO
     * @return
     */
    void createCategory(ShopDTO shopDTO);

    /**
     * 删除类别
     * @param shopDTO
     * @return
     */
    void deleteCategory(ShopDTO shopDTO);

    /**
     * 更新商品信息
     * @param shopDTO
     * @return
     */
    void updateShopInfo(ShopDTO shopDTO);

    /**
     * 新增商品信息
     * @param shopDTO
     * @return
     */
    void createShop(ShopDTO shopDTO);

    /**
     * 获取购物车信息
     * @param shopQO
     * @return
     */
    List<ShopDTO> listShopCarInfo(ShopQO shopQO);

    /**
     * 删除购物车信息
     * @param shopDTO
     * @return
     */
    void deleteShopCar(ShopDTO shopDTO);

    /**
     * 添加购物车信息
     * @param shopDTO
     * @return
     */
    void createShopCar(ShopDTO shopDTO);

    /**
     * 更新购物车信息
     * @param shopDTO
     * @return
     */
    void updateShopCarInfo(ShopDTO shopDTO);

    /**
     * 获取购物车总价
     * @param shopQO
     * @return
     */
    ShopDTO getShopCarPrice(ShopQO shopQO);

    /**
     * 检查购物车信息
     * @param shopQO
     * @return
     */
    List<ShopDTO> checkShopCar(ShopQO shopQO);

}
