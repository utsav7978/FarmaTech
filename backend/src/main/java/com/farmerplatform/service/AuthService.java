package com.farmerplatform.service;

import com.farmerplatform.dto.JwtResponseDto;
import com.farmerplatform.dto.LoginDto;
import com.farmerplatform.dto.UserRegistrationDto;
import com.farmerplatform.dto.UserResponseDto;
import com.farmerplatform.entity.User;
import com.farmerplatform.exception.InvalidCredentialsException;
import com.farmerplatform.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service class for Authentication-related operations
 */
@Service
@RequiredArgsConstructor
@Transactional
public class AuthService {
    
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    
    /**
     * Register a new user
     */
    public UserResponseDto register(UserRegistrationDto registrationDto) {
        return userService.registerUser(registrationDto);
    }
    
    /**
     * Authenticate user and generate JWT token
     */
    public JwtResponseDto login(LoginDto loginDto) {
        User user = userService.getUserByEmail(loginDto.getEmail());
        
        // Verify password
        if (!passwordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Invalid email or password");
        }
        
        // Generate JWT token
        String token = jwtTokenProvider.generateToken(user.getEmail(), user.getRole().toString());
        
        // Convert user to response dto
        UserResponseDto userDto = new UserResponseDto();
        userDto.setId(user.getId());
        userDto.setName(user.getName());
        userDto.setEmail(user.getEmail());
        userDto.setContact(user.getContact());
        userDto.setRole(user.getRole());
        userDto.setCreatedAt(user.getCreatedAt());
        
        return new JwtResponseDto(token, userDto);
    }
}