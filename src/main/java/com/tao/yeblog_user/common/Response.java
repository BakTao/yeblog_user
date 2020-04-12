package com.tao.yeblog_user.common;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.io.Serializable;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Response<T> implements Serializable {

    private ResponseHead head;      //响应体头部

    private T body;                 //响应体内容

    public static <T> Response<T> successData(T data){
        return new Response<>(data);
    }

    public Response(){

    }

    public Response(T data){
        this.head = new ResponseHead();
        this.body = data;
    }

    public Response(String errorCode, String errorMsg) {
        this.head = new ResponseHead(errorCode, errorMsg);
    }
}
