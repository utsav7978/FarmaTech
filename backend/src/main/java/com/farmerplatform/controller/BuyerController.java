package com.farmerplatform.controller;

import com.farmerplatform.dto.ApiResponse;
import com.farmerplatform.dto.CropResponseDto;
import com.farmerplatform.dto.PurchaseDto;
import com.farmerplatform.dto.PurchaseResponseDto;
import com.farmerplatform.service.CropService;
import com.farmerplatform.service.PurchaseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Buyer-specific endpoints (Government Officials and Industrialists)
 */
@RestController
@RequestMapping("/api/buyer")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
public class BuyerController {
    
    private final CropService cropService;
    private final PurchaseService purchaseService;
    
    /**
     * View all available crops
     */
    @GetMapping("/crops")
    public ResponseEntity<ApiResponse> getAllCrops() {
        List<CropResponseDto> crops = cropService.getAllCrops();
        ApiResponse response = new ApiResponse(true, "Crops retrieved successfully", crops);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    /**
     * Get crop by ID
     */
    @GetMapping("/crops/{id}")
    public ResponseEntity<ApiResponse> getCropById(@PathVariable Long id) {
        CropResponseDto crop = cropService.getCropById(id);
        ApiResponse response = new ApiResponse(true, "Crop retrieved successfully", crop);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    /**
     * Create purchase request
     */
    @PostMapping("/purchase")
    public ResponseEntity<ApiResponse> createPurchase(@Valid @RequestBody PurchaseDto purchaseDto,
                                                     Authentication authentication) {
        PurchaseResponseDto purchase = purchaseService.createPurchase(purchaseDto, authentication.getName());
        ApiResponse response = new ApiResponse(true, "Purchase request created successfully", purchase);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    /**
     * Get buyer's purchase history
     */
    @GetMapping("/purchases")
    public ResponseEntity<ApiResponse> getMyPurchases(Authentication authentication) {
        List<PurchaseResponseDto> purchases = purchaseService.getPurchasesByBuyer(authentication.getName());
        ApiResponse response = new ApiResponse(true, "Purchase history retrieved successfully", purchases);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}