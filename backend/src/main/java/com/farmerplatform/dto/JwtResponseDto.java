package com.farmerplatform.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * DTO for JWT authentication response
 */
@Data
@AllArgsConstructor
public class JwtResponseDto {
    private String token;
    private String type = "Bearer";
    private UserResponseDto user;
    
    public JwtResponseDto(String token, UserResponseDto user) {
        this.token = token;
        this.user = user;
    }
}