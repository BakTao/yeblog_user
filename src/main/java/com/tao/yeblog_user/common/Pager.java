package com.tao.yeblog_user.common;

import lombok.Data;

import java.io.Serializable;

@Data
public class Pager implements Serializable {
    protected int pageIndex;
    protected int pageSize;
    protected int pageCount = 0;
    protected long recordCount = 0;

    private int prePageIndex = 0;
    private int nextPageIndex = 0;
    private boolean existsPrePage = false;
    private boolean existsNextPage = false;

    public Pager() {
        this.pageIndex = 1;
        this.pageSize = 10;
    }

}
