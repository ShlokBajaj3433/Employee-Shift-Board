package com.employeeboard.employee.repository;

import com.employeeboard.employee.model.Shift;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ShiftRepository extends JpaRepository<Shift, Long> {
    List<Shift> findByEmployeeId(Long employeeId);
    List<Shift> findByDate(LocalDate date);
    List<Shift> findByEmployeeIdAndDate(Long employeeId, LocalDate date);
}
