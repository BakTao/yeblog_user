package com.tao.yeblog_user.service.impl;

import com.tao.yeblog_user.dao.UploadMapper;
import com.tao.yeblog_user.model.dto.FileDTO;
import com.tao.yeblog_user.service.IUploadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UploadService implements IUploadService {

    @Autowired
    private UploadMapper uploadMapper;


    @Override
    public void saveUploadFile(FileDTO fileDTO) {
        uploadMapper.saveUploadFile(fileDTO);
    }
}
