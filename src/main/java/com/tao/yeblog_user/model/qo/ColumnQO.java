package com.tao.yeblog_user.model.qo;

import com.tao.yeblog_user.common.BasePage;
import lombok.Data;

/**
 * 专栏信息QO
 */
@Data
public class ColumnQO extends BasePage {

    private String columnName; //名字

    private String columnId; //专栏Id

    private String blogType; //博客类型

    private String blogCountQ; //博客数起

    private String blogCountZ; //博客数止

}
