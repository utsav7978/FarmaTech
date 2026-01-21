package com.farmerplatform.controller;

import com.farmerplatform.dto.*;
import com.farmerplatform.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * REST Controller for Authentication endpoints
 */
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
public class AuthController {
    
    private final AuthService authService;
    
    /**
     * User Registration Endpoint
     */
    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody UserRegistrationDto registrationDto) {
        UserResponseDto user = authService.register(registrationDto);
        ApiResponse response = new ApiResponse(true, "User registered successfully", user);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    /**
     * User Login Endpoint
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginDto loginDto) {
        JwtResponseDto jwtResponse = authService.login(loginDto);
        ApiResponse response = new ApiResponse(true, "Login successful", jwtResponse);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}