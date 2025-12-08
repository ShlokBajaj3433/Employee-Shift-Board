package com.employeeboard.employee.service;

import com.employeeboard.employee.dto.ShiftRequest;
import com.employeeboard.employee.model.Shift;
import com.employeeboard.employee.repository.ShiftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ShiftService {
    
    @Autowired
    private ShiftRepository shiftRepository;

    public Shift createShift(ShiftRequest request) {
        Shift shift = new Shift();
        shift.setEmployeeId(request.getEmployeeId());
        shift.setDate(request.getDate());
        shift.setShiftType(request.getShiftType());
        return shiftRepository.save(shift);
    }

    public List<Shift> getShifts(Long employeeId, LocalDate date) {
        if (employeeId != null && date != null) {
            return shiftRepository.findByEmployeeIdAndDate(employeeId, date);
        } else if (employeeId != null) {
            return shiftRepository.findByEmployeeId(employeeId);
        } else if (date != null) {
            return shiftRepository.findByDate(date);
        }
        return shiftRepository.findAll();
    }

    public void deleteShift(Long id) {
        shiftRepository.deleteById(id);
    }
}
