package com.travelmatcher.controller;

import com.travelmatcher.model.Schedule;
import com.travelmatcher.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/schedule")
@CrossOrigin(origins = "*", allowCredentials = "true")
public class ScheduleController {
    @Autowired
    private ScheduleService scheduleService;

    /**
     * 스케줄 추가
     *
     * @param principal 인증된 사용자
     * @param requests  스케줄 추가 요청 목록
     * @return 저장된 스케줄 목록
     */
    @PostMapping("/add")
    public List<Schedule> addSchedules(Principal principal, @RequestBody List<ScheduleService.ScheduleRequest> requests) {
        return scheduleService.addSchedules(principal.getName(), requests);
    }

    /**
     * 사용자의 모든 스케줄 조회
     *
     * @param principal 인증된 사용자
     * @return 스케줄 목록
     */
    @GetMapping
    public List<Schedule> getSchedules(Principal principal) {
        return scheduleService.getSchedules(principal.getName());
    }

    /**
     * 스케줄 삭제
     *
     * @param scheduleId 삭제할 스케줄의 ID
     * @param principal  인증된 사용자
     * @return 삭제 성공 여부
     */
    @DeleteMapping("/{scheduleId}")
    public boolean deleteSchedule(@PathVariable Long scheduleId, Principal principal) {
        return scheduleService.deleteSchedule(scheduleId, principal.getName());
    }

    /**
     * 스케줄 수정
     *
     * @param scheduleId 수정할 스케줄의 ID
     * @param principal  인증된 사용자
     * @param request    수정할 날짜 정보
     * @return 수정된 스케줄 객체 또는 null
     */
    @PutMapping("/{scheduleId}")
    public Schedule updateSchedule(@PathVariable Long scheduleId, Principal principal, @RequestBody UpdateScheduleRequest request) {
        return scheduleService.updateSchedule(scheduleId, principal.getName(), request.getDate());
    }

    /**
     * 내부 클래스: 스케줄 수정 요청 데이터 구조
     */
    static class UpdateScheduleRequest {
        private String date;

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }
    }
}