package com.tao.yeblog_user.common;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageDefaultImpl<T> implements IPage<T> {
    protected Pager pager = null;

    protected List<T> data = null;

}
