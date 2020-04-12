package com.tao.yeblog_user.model.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * 博客量统计DTO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class BlogChartsDTO {

    private String tjny;    //统计年月

    private String value;   //值

    private String name;   //名称

    private String type;    //类型
}
