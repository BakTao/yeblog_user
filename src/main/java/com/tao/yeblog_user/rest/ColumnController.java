package com.tao.yeblog_user.rest;

import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.common.Response;
import com.tao.yeblog_user.model.dto.ColumnDTO;
import com.tao.yeblog_user.model.dto.SelectDTO;
import com.tao.yeblog_user.model.qo.ColumnQO;
import com.tao.yeblog_user.service.IColumnService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * 专栏管理Controller
 */
@RestController
@RequestMapping("/back/columnServices")
public class ColumnController {

    @Autowired
    private IColumnService columnService;

    /**
     * 获取专栏信息(分页)
     * @param columnQO
     * @return
     */
    @PostMapping("/pageColumnInfo")
    public Response<IPage<ColumnDTO>> pageColumnInfo(@RequestBody ColumnQO columnQO){
        return Response.successData(columnService.pageColumnInfo(columnQO));
    }

    /**
     * 获取专栏信息
     * @param columnQO
     * @return
     */
    @PostMapping("/listColumnInfo")
    public Response<List<SelectDTO>> listColumnInfo(@RequestBody ColumnQO columnQO){
        return Response.successData(columnService.listColumnInfo(columnQO));
    }

    /**
     * 获取专栏信息(包含全部)
     * @param columnQO
     * @return
     */
    @PostMapping("/listColumnInfoAll")
    public Response<List<SelectDTO>> listColumnInfoAll(@RequestBody ColumnQO columnQO){
        return Response.successData(columnService.listColumnInfoAll(columnQO));
    }

    /**
     * 获取专栏信息(分页)
     * @param columnQO
     * @return
     */
    @PostMapping("/pageBlogColumnInfo")
    public Response<IPage<ColumnDTO>> pageBlogColumnInfo(@RequestBody ColumnQO columnQO){
        return Response.successData(columnService.pageBlogColumnInfo(columnQO));
    }

    /**
     * 获取专栏信息(包含全部)
     * @param columnQO
     * @return
     */
    @PostMapping("/listBlogColumnInfoAll")
    public Response<List<ColumnDTO>> listBlogColumnInfoAll(@RequestBody ColumnQO columnQO){
        return Response.successData(columnService.listBlogColumnInfoAll(columnQO));
    }

    /**
     * 新增专栏信息
     * @param columnDTO
     * @return
     */
    @PostMapping("/createColumn")
    public Response<String> createColumn(@RequestBody ColumnDTO columnDTO){
        return Response.successData(columnService.createColumn(columnDTO));
    }

    /**
     * 更新专栏信息
     * @param columnDTO
     * @return
     */
    @PostMapping("/updateColumnInfo")
    public Response<String> updateColumnInfo(@RequestBody ColumnDTO columnDTO){
        return Response.successData(columnService.updateColumnInfo(columnDTO));
    }

    /**
     * 删除专栏信息
     * @param columnDTO
     * @return
     */
    @PostMapping("/deleteColumn")
    public Response deleteColumn(@RequestBody ColumnDTO columnDTO){
        if(columnDTO.getColumnId() == null || "".equals(columnDTO.getColumnId())){
            return new Response<>("001","专栏ID不能为空");
        }
        return Response.successData(columnService.deleteColumn(columnDTO));
    }
}
