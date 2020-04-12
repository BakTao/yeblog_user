package com.tao.yeblog_user.service;

import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.model.dto.SelectDTO;
import com.tao.yeblog_user.model.dto.ShopDTO;
import com.tao.yeblog_user.model.qo.ShopQO;

import java.util.List;

/**
 * 商城管理Service
 */
public interface IShopService {

    /**
     * 获取商品信息
     * @param shopQO
     * @return
     */
    IPage<ShopDTO> pageShopInfo(ShopQO shopQO);

    /**
     * 增加商品
     * @param shopDTO
     * @return
     */
    String createShop(ShopDTO shopDTO);

    /**
     * 更新商品信息
     * @param shopDTO
     * @return
     */
    String updateShopInfo(ShopDTO shopDTO);

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
    String createCategory(ShopDTO shopDTO);

    /**
     * 删除类别
     * @param shopDTO
     * @return
     */
    String deleteCategory(ShopDTO shopDTO);
}
