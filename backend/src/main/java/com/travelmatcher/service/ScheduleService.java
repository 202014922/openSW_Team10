package com.travelmatcher.service;

import com.travelmatcher.model.Schedule;
import com.travelmatcher.model.User;
import com.travelmatcher.repository.ScheduleRepository;
import com.travelmatcher.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private UserRepository userRepository;

    /**
     * 사용자의 이메일을 기반으로 스케줄을 추가합니다.
     *
     * @param userEmail 사용자의 이메일
     * @param requests 추가할 스케줄 요청 목록
     * @return 저장된 스케줄 목록
     */
    public List<Schedule> addSchedules(String userEmail, List<ScheduleRequest> requests) {
        Optional<User> optionalUser = userRepository.findByEmail(userEmail);
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            List<Schedule> schedules = requests.stream()
                    .map(req -> {
                        Schedule schedule = new Schedule();
                        schedule.setDate(LocalDate.parse(req.getDate()));
                        schedule.setUser(user);
                        return schedule;
                    })
                    .collect(Collectors.toList());
            return scheduleRepository.saveAll(schedules);
        }
        return List.of();
    }

    /**
     * 사용자의 이메일을 기반으로 모든 스케줄을 가져옵니다.
     *
     * @param userEmail 사용자의 이메일
     * @return 스케줄 목록
     */
    public List<Schedule> getSchedules(String userEmail) {
        Optional<User> optionalUser = userRepository.findByEmail(userEmail);
        if(optionalUser.isPresent()) {
            User user = optionalUser.get();
            return scheduleRepository.findAll().stream()
                    .filter(schedule -> schedule.getUser().getId().equals(user.getId()))
                    .collect(Collectors.toList());
        }
        return List.of();
    }

    /**
     * 특정 스케줄을 삭제합니다.
     *
     * @param scheduleId 삭제할 스케줄의 ID
     * @param userEmail  요청자의 이메일
     * @return 삭제 성공 여부
     */
    public boolean deleteSchedule(Long scheduleId, String userEmail) {
        Optional<Schedule> optionalSchedule = scheduleRepository.findById(scheduleId);
        if(optionalSchedule.isPresent()) {
            Schedule schedule = optionalSchedule.get();
            if(schedule.getUser().getEmail().equals(userEmail)) {
                scheduleRepository.delete(schedule);
                return true;
            }
        }
        return false;
    }

    /**
     * 스케줄 수정
     *
     * @param scheduleId 수정할 스케줄의 ID
     * @param userEmail  요청자의 이메일
     * @param newDate    새로운 날짜
     * @return 수정된 스케줄 객체 또는 null
     */
    public Schedule updateSchedule(Long scheduleId, String userEmail, String newDate) {
        Optional<Schedule> optionalSchedule = scheduleRepository.findById(scheduleId);
        if(optionalSchedule.isPresent()) {
            Schedule schedule = optionalSchedule.get();
            if(schedule.getUser().getEmail().equals(userEmail)) {
                schedule.setDate(LocalDate.parse(newDate));
                return scheduleRepository.save(schedule);
            }
        }
        return null;
    }

    /**
     * 내부 클래스: 스케줄 요청 데이터 구조
     */
    public static class ScheduleRequest {
        private String date;

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }
    }
}