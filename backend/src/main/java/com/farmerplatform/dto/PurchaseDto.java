package com.farmerplatform.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

/**
 * DTO for purchase request
 */
@Data
public class PurchaseDto {
    
    @NotNull(message = "Crop ID is required")
    private Long cropId;
    
    @NotNull(message = "Quantity is required")
    @DecimalMin(value = "0.1", message = "Quantity must be at least 0.1 kg")
    private BigDecimal quantity;
}