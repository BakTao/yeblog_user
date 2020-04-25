package com.tao.yeblog_user.dao;

import com.tao.yeblog_user.model.dto.FileDTO;
import org.apache.ibatis.annotations.Mapper;

/**
 * 文件上传Mapper
 */
@Mapper
public interface UploadMapper {

    /**
     * 存储文件信息
     * @param fileDTO
     * @return
     */
    void saveUploadFile(FileDTO fileDTO);

    /**
     * 删除文件信息
     * @param fileDTO
     * @return
     */
    void deleteUploadFile(FileDTO fileDTO);
}
