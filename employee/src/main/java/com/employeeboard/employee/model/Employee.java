package com.employeeboard.employee.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

@Entity
@Table(name = "employees")
@SequenceGenerator(name = "employee_seq", sequenceName = "employee_sequence", initialValue = 1, allocationSize = 1)
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "employee_seq")
    private Long id;

    @NotBlank
    @Column(nullable = false)
    private String name;

    @NotBlank
    @Column(name = "employee_code", nullable = false, unique = true)
    private String employeeCode;

    @NotBlank
    @Column(nullable = false)
    private String department;

    // Constructors
    public Employee() {}

    public Employee(String name, String employeeCode, String department) {
        this.name = name;
        this.employeeCode = employeeCode;
        this.department = department;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    
    public String getEmployeeCode() { return employeeCode; }
    public void setEmployeeCode(String employeeCode) { this.employeeCode = employeeCode; }
    
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
}
