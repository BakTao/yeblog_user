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



}
