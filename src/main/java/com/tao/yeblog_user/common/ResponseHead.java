package com.tao.yeblog_user.common;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseHead {

    private final static String successCode = "0";

    private String code;

    private String msg;

    public ResponseHead(){
        this.code = successCode;
        this.msg = "请求成功";
    }

    public ResponseHead(String errorCode, String errorMsg) {
        this.code = errorCode;
        this.msg = errorMsg;
    }
}
