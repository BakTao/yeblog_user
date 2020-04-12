package com.tao.yeblog_user.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.common.PageDefaultImpl;
import com.tao.yeblog_user.common.Pager;
import com.tao.yeblog_user.dao.ShopMapper;
import com.tao.yeblog_user.model.dto.SelectDTO;
import com.tao.yeblog_user.model.dto.ShopDTO;
import com.tao.yeblog_user.model.qo.ShopQO;
import com.tao.yeblog_user.service.IShopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ShopService implements IShopService {

    @Autowired
    private ShopMapper shopMapper;

    @Override
    public IPage<ShopDTO> pageShopInfo(ShopQO shopQO) {

        if(shopQO.getCategoryId() != null && !"".equals(shopQO.getCategoryId())){
            shopQO.setCategoryIds(shopQO.getCategoryId().split(","));
        }
        PageDefaultImpl<ShopDTO> page = new PageDefaultImpl<>();

        PageHelper.startPage(shopQO.getPageIndex(),shopQO.getPageSize());
        PageInfo<ShopDTO> pageInfo = new PageInfo<>(shopMapper.pageShopInfo(shopQO));

        Pager pager = new Pager();
        pager.setPageIndex(pageInfo.getPageNum());
        pager.setPageSize(pageInfo.getPageSize());
        pager.setPageCount(pageInfo.getPages());
        pager.setRecordCount(pageInfo.getTotal());
        pager.setPrePageIndex(pageInfo.getPrePage());
        pager.setNextPageIndex(pageInfo.getNextPage());
        pager.setExistsPrePage(pageInfo.isHasPreviousPage());
        pager.setExistsNextPage(pageInfo.isHasNextPage());

        page.setPager(pager);
        page.setData(pageInfo.getList());

        return page;
    }

    @Override
    public String createShop(ShopDTO shopDTO) {
        String goodsId = "g" + shopDTO.getType() +  new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());
        shopDTO.setGoodsId(goodsId);
        shopMapper.createShop(shopDTO);
        return "success";
    }

    @Override
    public String updateShopInfo(ShopDTO shopDTO) {
        shopMapper.updateShopInfo(shopDTO);
        return "success";
    }

    @Override
    public List<SelectDTO> listCategoryInfo() {
        return shopMapper.listCategoryInfo();
    }

    @Override
    public String createCategory(ShopDTO shopDTO) {
        String categoryId = "cg" + new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());
        shopDTO.setCategoryId(categoryId);
        shopMapper.createCategory(shopDTO);
        return "success";
    }

    @Override
    public String deleteCategory(ShopDTO shopDTO) {
        if(shopDTO.getCategoryId() != null && !"".equals(shopDTO.getCategoryId())){
            shopDTO.setCategoryIds(shopDTO.getCategoryId().split(","));
        }

        shopMapper.deleteCategory(shopDTO);
        return "success";
    }
}
