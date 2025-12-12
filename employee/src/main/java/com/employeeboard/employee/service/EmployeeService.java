package com.employeeboard.employee.service;

import com.employeeboard.employee.model.Employee;
import com.employeeboard.employee.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {
    
    @Autowired
    private EmployeeRepository employeeRepository;

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> getEmployeeById(Long id) {
        return employeeRepository.findById(id);
    }

    public Employee createEmployee(Employee employee) {
        // Auto-generate employee code if not provided or empty
        if (employee.getEmployeeCode() == null || employee.getEmployeeCode().trim().isEmpty()) {
            Employee savedEmployee = employeeRepository.save(employee);
            savedEmployee.setEmployeeCode("EMP" + String.format("%03d", savedEmployee.getId()));
            return employeeRepository.save(savedEmployee);
        }
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(Long id, Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        
        employee.setName(employeeDetails.getName());
        employee.setEmployeeCode(employeeDetails.getEmployeeCode());
        employee.setDepartment(employeeDetails.getDepartment());
        
        return employeeRepository.save(employee);
    }

    public void deleteEmployee(Long id) {
        employeeRepository.deleteById(id);
    }
}
