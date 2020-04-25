package com.tao.yeblog_user.service.impl;

import com.tao.yeblog_user.dao.UploadMapper;
import com.tao.yeblog_user.model.dto.FileDTO;
import com.tao.yeblog_user.service.IUploadService;
import io.minio.MinioClient;
import io.minio.errors.InvalidEndpointException;
import io.minio.errors.InvalidPortException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class UploadService implements IUploadService {

    @Value("${minio.config.url}")
    private String url;

    @Value("${minio.config.accessKey}")
    private String accessKey;

    @Value("${minio.config.secretKey}")
    private String secretKey;

    @Autowired
    private UploadMapper uploadMapper;


    @Override
    public void saveUploadFile(FileDTO fileDTO) {
        uploadMapper.saveUploadFile(fileDTO);
    }

    @Override
    public void deleteUploadFile(FileDTO fileDTO) {
        try {
            MinioClient minioClient = new MinioClient(url, accessKey, secretKey);
            minioClient.removeObject("yeblog",fileDTO.getFileName());
        } catch (Exception e) {
            e.printStackTrace();
        }
        uploadMapper.deleteUploadFile(fileDTO);
    }
}
