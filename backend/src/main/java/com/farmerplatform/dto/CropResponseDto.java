package com.farmerplatform.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO for crop response
 */
@Data
public class CropResponseDto {
    private Long id;
    private String name;
    private String description;
    private BigDecimal quantity;
    private BigDecimal price;
    private String farmerName;
    private String farmerEmail;
    private String farmerContact;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}