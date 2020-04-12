package com.tao.yeblog_user.service;

import com.tao.yeblog_user.model.dto.FileDTO;

/**
 * 文件上传Service
 */
public interface IUploadService {

    /**
     * 存储文件信息
     * @param fileDTO
     * @return
     */
    void saveUploadFile(FileDTO fileDTO);
}
