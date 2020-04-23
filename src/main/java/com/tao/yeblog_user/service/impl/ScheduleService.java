package com.tao.yeblog_user.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.tao.yeblog_user.common.IPage;
import com.tao.yeblog_user.common.PageDefaultImpl;
import com.tao.yeblog_user.common.Pager;
import com.tao.yeblog_user.dao.ScheduleMapper;
import com.tao.yeblog_user.model.dto.ScheduleDTO;
import com.tao.yeblog_user.model.qo.ScheduleQO;
import com.tao.yeblog_user.service.IScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
public class ScheduleService implements IScheduleService {

    @Autowired
    private ScheduleMapper scheduleMapper;

    @Override
    public IPage<ScheduleDTO> pageScheduleInfo(ScheduleQO scheduleQO) {
        if(scheduleQO.getType() != null && !"".equals(scheduleQO.getType())){
            scheduleQO.setTypes(scheduleQO.getType().split(","));
        }

        PageDefaultImpl<ScheduleDTO> page = new PageDefaultImpl<>();

        PageHelper.startPage(scheduleQO.getPageIndex(),scheduleQO.getPageSize());
        PageInfo<ScheduleDTO> pageInfo = new PageInfo<>(scheduleMapper.pageScheduleInfo(scheduleQO));

        Pager pager = new Pager();
        pager.setPageIndex(pageInfo.getPageNum());
        pager.setPageSize(pageInfo.getPageSize());
        pager.setPageCount(pageInfo.getPages());
        pager.setRecordCount(pageInfo.getTotal());
        pager.setPrePageIndex(pageInfo.getPrePage());
        pager.setNextPageIndex(pageInfo.getNextPage());
        pager.setExistsPrePage(pageInfo.isHasPreviousPage());
        pager.setExistsNextPage(pageInfo.isHasNextPage());

        page.setPager(pager);
        page.setData(pageInfo.getList());

        return page;
    }

    @Override
    public String updateScheduleInfo(ScheduleDTO scheduleDTO) {
        if(scheduleDTO.getScheduleId() != null && !"".equals(scheduleDTO.getScheduleId())){
            scheduleDTO.setScheduleIds(scheduleDTO.getScheduleId().split(","));
        }
        scheduleMapper.updateScheduleInfo(scheduleDTO);
        return "success";
    }

    @Override
    public String deleteSchedule(ScheduleDTO scheduleDTO) {
        if(scheduleDTO.getScheduleId() != null && !"".equals(scheduleDTO.getScheduleId())){
            scheduleDTO.setScheduleIds(scheduleDTO.getScheduleId().split(","));
        }
        scheduleMapper.deleteSchedule(scheduleDTO);
        return "success";
    }

    @Override
    public String createSchedule(ScheduleDTO scheduleDTO) {
        String scheduleId = "s" + new SimpleDateFormat("yyyyMMddHHmmssSSS").format(new Date());

        scheduleDTO.setScheduleId(scheduleId);

        scheduleMapper.createSchedule(scheduleDTO);
        return "success";
    }
}
