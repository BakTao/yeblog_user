package com.tao.yeblog_user.common;

import lombok.Data;

import java.io.Serializable;

@Data
public class BasePage implements Serializable {

    private int pageIndex = 1;

    private int pageSize = 10;

}
