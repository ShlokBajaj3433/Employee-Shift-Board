package com.employeeboard.employee;

import com.employeeboard.employee.model.User;
import com.employeeboard.employee.model.Employee;
import com.employeeboard.employee.repository.UserRepository;
import com.employeeboard.employee.repository.EmployeeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seedUsers(UserRepository userRepository, EmployeeRepository employeeRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Create default employees
            if (!employeeRepository.existsByEmployeeCode("EMP001")) {
                Employee emp1 = new Employee("John Doe", "EMP001", "Engineering");
                employeeRepository.save(emp1);
                System.out.println("Employee created: John Doe, code=EMP001, dept=Engineering");
            }
            
            if (!employeeRepository.existsByEmployeeCode("EMP002")) {
                Employee emp2 = new Employee("Jane Smith", "EMP002", "Operations");
                employeeRepository.save(emp2);
                System.out.println("Employee created: Jane Smith, code=EMP002, dept=Operations");
            }
            
            if (!employeeRepository.existsByEmployeeCode("EMP003")) {
                Employee emp3 = new Employee("Bob Johnson", "EMP003", "Administration");
                employeeRepository.save(emp3);
                System.out.println("Employee created: Bob Johnson, code=EMP003, dept=Administration");
            }
            
            // Create admin user
            if (!userRepository.existsByUsername("admin")) {
                User admin = new User("admin", passwordEncoder.encode("admin123"), "ADMIN", "admin@employeeshift.com", "Admin User");
                userRepository.save(admin);
                System.out.println("Admin user created: username=admin, password=admin123");
            }
            
            // Create regular user
            if (!userRepository.existsByUsername("user")) {
                User user = new User("user", passwordEncoder.encode("user123"), "USER", "user@employeeshift.com", "Regular User");
                userRepository.save(user);
                System.out.println("Regular user created: username=user, password=user123");
            }
        };
    }
}
