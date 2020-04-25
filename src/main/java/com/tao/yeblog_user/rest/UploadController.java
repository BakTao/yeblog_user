package com.tao.yeblog_user.rest;

import com.alibaba.fastjson.JSONObject;
import com.tao.yeblog_user.common.Response;
import com.tao.yeblog_user.model.dto.FileDTO;
import com.tao.yeblog_user.service.IUploadService;
import io.minio.MinioClient;
import org.apache.tomcat.util.http.fileupload.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.File;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
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

    @PostMapping("/blogFileUpload")
    public Map<String,Object> blogFileUpload(@RequestParam(value = "editormd-image-file") MultipartFile file) {
        Map<String,Object> map = new HashMap<>();

        if (file == null || file.isEmpty() || file.getSize() == 0) {
            map.put("success",0);
            map.put("message","上传失败,文件为空");
            map.put("url","");
            return map;
        }

        try {
            MinioClient minioClient = new MinioClient(url, accessKey, secretKey);

            if (!minioClient.bucketExists("yeblog")) {
                minioClient.makeBucket("yeblog");
            }

            String fileName = file.getOriginalFilename();
            String uuid = UUID.randomUUID().toString();
            String newName ="blog/"+ uuid.replaceAll("-", "")
                    + fileName.substring(fileName.lastIndexOf("."));

            InputStream inputStream = file.getInputStream();	//获取file的inputStream
            minioClient.putObject("yeblog", newName, inputStream, "application/octet-stream");	//上传
            inputStream.close();

            map.put("success",1);
            map.put("message","上传成功");
            map.put("url","http://169.254.211.25:9000/yeblog/"+newName);
            return map;
        } catch (Exception e) {
            e.printStackTrace();
        }
        map.put("success",0);
        map.put("message","上传失败,请稍后再试");
        map.put("url","");
        return map;
    }
}
