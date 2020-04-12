package com.tao.yeblog_user.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.common.PageDefaultImpl;
import com.tao.yeblog_user.common.Pager;
import com.tao.yeblog_user.dao.ColumnMapper;
import com.tao.yeblog_user.model.dto.ColumnDTO;
import com.tao.yeblog_user.model.dto.SelectDTO;
import com.tao.yeblog_user.model.qo.ColumnQO;
import com.tao.yeblog_user.service.IColumnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class ColumnService implements IColumnService {

    @Autowired
    private ColumnMapper columnMapper;

    @Override
    public IPage<ColumnDTO> pageColumnInfo(ColumnQO columnQO) {
        PageDefaultImpl<ColumnDTO> page = new PageDefaultImpl<>();

        PageHelper.startPage(columnQO.getPageIndex(),columnQO.getPageSize());
        PageInfo<ColumnDTO> pageInfo = new PageInfo<>(columnMapper.pageColumnInfo(columnQO));

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
    public List<SelectDTO> listColumnInfo(ColumnQO columnQO) {
        return columnMapper.listColumnInfo(columnQO);
    }

    @Override
    public List<SelectDTO> listColumnInfoAll(ColumnQO columnQO) {
        return columnMapper.listColumnInfoAll(columnQO);
    }

    @Override
    public String createColumn(ColumnDTO columnDTO) {
        String columnId = 'c' + new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());
        columnDTO.setColumnId(columnId);
        columnMapper.createColumn(columnDTO);
        return "success";
    }

    @Override
    public String updateColumnInfo(ColumnDTO columnDTO) {
        columnMapper.updateColumnInfo(columnDTO);
        return "success";
    }

    @Override
    public String deleteColumn(ColumnDTO columnDTO) {
        columnMapper.deleteColumn(columnDTO);
        return "success";
    }
}
