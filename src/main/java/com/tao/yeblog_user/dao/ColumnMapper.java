package com.tao.yeblog_user.dao;

import com.github.pagehelper.Page;
import com.tao.yeblog_user.model.dto.ColumnDTO;
import com.tao.yeblog_user.model.dto.SelectDTO;
import com.tao.yeblog_user.model.qo.ColumnQO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 专栏管理Mapper
 */
@Mapper
public interface ColumnMapper {

    /**
     * 获取专栏信息(分页)
     * @param columnQO
     * @return
     */
    Page<ColumnDTO> pageColumnInfo(ColumnQO columnQO);

    /**
     * 获取专栏信息
     * @param columnQO
     * @return
     */
    List<SelectDTO> listColumnInfo(ColumnQO columnQO);

    /**
     * 获取专栏信息(包含全部)
     * @param columnQO
     * @return
     */
    List<SelectDTO> listColumnInfoAll(ColumnQO columnQO);

    /**
     * 增加专栏信息
     * @param columnDTO
     * @return
     */
    void createColumn(ColumnDTO columnDTO);

    /**
     * 更新专栏信息
     * @param columnDTO
     * @return
     */
    void updateColumnInfo(ColumnDTO columnDTO);

    /**
     * 删除专栏信息
     * @param columnDTO
     * @return
     */
    void deleteColumn(ColumnDTO columnDTO);
}
