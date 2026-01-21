package com.farmerplatform.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * DTO for purchase response
 */
@Data
public class PurchaseResponseDto {
    private Long id;
    private String cropName;
    private String farmerName;
    private String buyerName;
    private BigDecimal quantity;
    private BigDecimal totalPrice;
    private LocalDateTime timestamp;
}