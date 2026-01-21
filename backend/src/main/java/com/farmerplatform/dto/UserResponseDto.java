package com.farmerplatform.dto;

import com.farmerplatform.entity.Role;
import lombok.Data;

import java.time.LocalDateTime;

/**
 * DTO for user response (without sensitive information)
 */
@Data
public class UserResponseDto {
    private Long id;
    private String name;
    private String email;
    private String contact;
    private Role role;
    private LocalDateTime createdAt;
}