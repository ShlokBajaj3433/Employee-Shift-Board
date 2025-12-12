package com.employeeboard.employee.service;

import com.employeeboard.employee.dto.ShiftRequest;
import com.employeeboard.employee.exception.EmployeeNotFoundException;
import com.employeeboard.employee.model.Shift;
import com.employeeboard.employee.repository.EmployeeRepository;
import com.employeeboard.employee.repository.ShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.util.List;

@Service
public class ShiftService {
    
    @Autowired
    private ShiftRepository shiftRepository;
    
    @Autowired
    private EmployeeRepository employeeRepository;

    public Shift createShift(ShiftRequest request) {
        // Validate employee exists
        if (!employeeRepository.existsById(request.getEmployeeId())) {
            throw new EmployeeNotFoundException("Employee with ID " + request.getEmployeeId() + " not found");
        }
        
        Shift shift = new Shift(
            request.getEmployeeId(),
            request.getDate(),
            request.getStartTime(),
            request.getEndTime()
        );
        
        // Business Rule: Validate minimum 4-hour shift duration
        validateShiftDuration(shift);
        
        // Business Rule: Validate no overlapping shifts for the same employee
        validateNoOverlappingShifts(shift);
        
        return shiftRepository.save(shift);
    }

    private void validateShiftDuration(Shift shift) {
        Duration duration = Duration.between(shift.getStartTime(), shift.getEndTime());
        long hours = duration.toHours();
        
        // Handle overnight shifts (e.g., 22:00 to 06:00)
        if (hours < 0) {
            hours += 24;
        }
        
        if (hours < 4) {
            throw new IllegalArgumentException(
                "Shift duration must be at least 4 hours. Current duration: " + hours + " hours"
            );
        }
    }
    
    private void validateNoOverlappingShifts(Shift shift) {
        List<Shift> existingShifts = shiftRepository.findByEmployeeIdAndDate(
            shift.getEmployeeId(),
            shift.getDate()
        );
        
        if (!existingShifts.isEmpty()) {
            throw new IllegalArgumentException(
                "Employee already has a shift assigned on " + shift.getDate() + ". Only one shift per employee per day is allowed."
            );
        }
    }

    public List<Shift> getShifts(LocalDate date) {
        if (date != null) {
            return shiftRepository.findByDate(date);
        }
        return shiftRepository.findAll();
    }

    public void deleteShift(Long id) {
        shiftRepository.deleteById(id);
    }
}
