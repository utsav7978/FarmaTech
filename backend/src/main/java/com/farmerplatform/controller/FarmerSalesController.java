package com.farmerplatform.controller;

import com.farmerplatform.dto.ApiResponse;
import com.farmerplatform.dto.PurchaseResponseDto;
import com.farmerplatform.service.PurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Purchase-related endpoints accessible to farmers
 */
@RestController
@RequestMapping("/api/farmer/sales")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
public class FarmerSalesController {
    
    private final PurchaseService purchaseService;
    
    /**
     * Get sales for farmer's crops
     */
    @GetMapping
    public ResponseEntity<ApiResponse> getMySales(Authentication authentication) {
        List<PurchaseResponseDto> sales = purchaseService.getPurchasesForFarmer(authentication.getName());
        ApiResponse response = new ApiResponse(true, "Sales retrieved successfully", sales);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}