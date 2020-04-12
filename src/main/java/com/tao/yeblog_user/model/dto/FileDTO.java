package com.tao.yeblog_user.model.dto;


import lombok.Data;

/**
 * 文件DTO
 */
@Data
public class FileDTO {

    private String fileId;      //文件ID

    private String fileUrl;     //文件路径

    private String fileSize;    //文件大小

    private String fileName;    //文件名
}
