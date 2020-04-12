package com.tao.yeblog_user.rest;

import com.tao.yeblog_user.common.Response;
import com.tao.yeblog_user.model.dto.FileDTO;
import com.tao.yeblog_user.service.IUploadService;
import io.minio.MinioClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.UUID;

/**
 * 文件上传接口
 */
@RestController
@RequestMapping("/back/uploadServices")
public class UploadController {

    @Value("${minio.config.url}")
    private String url;

    @Value("${minio.config.accessKey}")
    private String accessKey;

    @Value("${minio.config.secretKey}")
    private String secretKey;

    @Autowired
    private IUploadService uploadService;

    @PostMapping("/fileUpload")
    public Response MinIOFileUpload(MultipartFile file) {

        if (file == null || file.isEmpty() || file.getSize() == 0) {
            return new Response("700","上传失败,文件为空");
        }

        try {
            MinioClient minioClient = new MinioClient(url, accessKey, secretKey);

            if (!minioClient.bucketExists("yeblog")) {
                minioClient.makeBucket("yeblog");
            }

            FileDTO fileDTO = new FileDTO();

            String fileName = file.getOriginalFilename();
            String uuid = UUID.randomUUID().toString();
            String newName ="file/"+ uuid.replaceAll("-", "")
                    + fileName.substring(fileName.lastIndexOf("."));

            InputStream inputStream = file.getInputStream();	//获取file的inputStream
            minioClient.putObject("yeblog", newName, inputStream, "application/octet-stream");	//上传
            inputStream.close();
            //String url = minioClient.getObjectUrl("yeblog", newName);	//文件访问路径

            fileDTO.setFileId(uuid);
            fileDTO.setFileName(fileName);
            fileDTO.setFileSize(String.valueOf(file.getSize()));
            fileDTO.setFileUrl("/yeblog/"+newName);
            uploadService.saveUploadFile(fileDTO);
            return Response.successData(fileDTO);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return new Response("701","上传失败,请稍后再试");
    }
}
