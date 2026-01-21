package com.farmerplatform.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * DTO for API responses
 */
@Data
@AllArgsConstructor
public class ApiResponse {
    private boolean success;
    private String message;
    private Object data;
    
    public ApiResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
    }
}
