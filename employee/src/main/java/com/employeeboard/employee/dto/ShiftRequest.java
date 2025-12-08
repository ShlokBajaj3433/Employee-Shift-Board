package com.employeeboard.employee.dto;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;

public class ShiftRequest {
    @NotNull(message = "Employee ID is required")
    private Long employeeId;

    @NotNull(message = "Date is required")
    private LocalDate date;

    private String shiftType;

    // Constructors
    public ShiftRequest() {}

    public ShiftRequest(Long employeeId, LocalDate date) {
        this.employeeId = employeeId;
        this.date = date;
    }

    // Getters and Setters
    public Long getEmployeeId() { return employeeId; }
    public void setEmployeeId(Long employeeId) { this.employeeId = employeeId; }
    
    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
    
    public String getShiftType() { return shiftType; }
    public void setShiftType(String shiftType) { this.shiftType = shiftType; }
}
