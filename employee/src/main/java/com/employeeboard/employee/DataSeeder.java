package com.employeeboard.employee;

import com.employeeboard.employee.model.User;
import com.employeeboard.employee.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seedUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if (!userRepository.existsByUsername("admin")) {
                User admin = new User("admin", passwordEncoder.encode("admin123"), "ADMIN", "admin@example.com", "Admin User");
                userRepository.save(admin);
                System.out.println("Admin user created: username=admin, password=admin123");
            }
            if (!userRepository.existsByUsername("user")) {
                User user = new User("user", passwordEncoder.encode("user123"), "USER", "user@example.com", "Regular User");
                userRepository.save(user);
                System.out.println("Regular user created: username=user, password=user123");
            }
        };
    }
}
