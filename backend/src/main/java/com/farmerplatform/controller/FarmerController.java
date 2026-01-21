package com.farmerplatform.controller;

import com.farmerplatform.dto.ApiResponse;
import com.farmerplatform.dto.CropDto;
import com.farmerplatform.dto.CropResponseDto;
import com.farmerplatform.service.CropService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Farmer-specific endpoints
 */
@RestController
@RequestMapping("/api/farmer")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
public class FarmerController {
    
    private final CropService cropService;
    
    /**
     * Add new crop
     */
    @PostMapping("/crops")
    public ResponseEntity<ApiResponse> addCrop(@Valid @RequestBody CropDto cropDto, 
                                             Authentication authentication) {
        CropResponseDto crop = cropService.addCrop(cropDto, authentication.getName());
        ApiResponse response = new ApiResponse(true, "Crop added successfully", crop);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }
    
    /**
     * Get farmer's own crops
     */
    @GetMapping("/crops")
    public ResponseEntity<ApiResponse> getMyCrops(Authentication authentication) {
        List<CropResponseDto> crops = cropService.getCropsByFarmer(authentication.getName());
        ApiResponse response = new ApiResponse(true, "Crops retrieved successfully", crops);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    /**
     * Update crop
     */
    @PutMapping("/crops/{id}")
    public ResponseEntity<ApiResponse> updateCrop(@PathVariable Long id,
                                                @Valid @RequestBody CropDto cropDto,
                                                Authentication authentication) {
        CropResponseDto crop = cropService.updateCrop(id, cropDto, authentication.getName());
        ApiResponse response = new ApiResponse(true, "Crop updated successfully", crop);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    /**
     * Delete crop
     */
    @DeleteMapping("/crops/{id}")
    public ResponseEntity<ApiResponse> deleteCrop(@PathVariable Long id,
                                                Authentication authentication) {
        cropService.deleteCrop(id, authentication.getName());
        ApiResponse response = new ApiResponse(true, "Crop deleted successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}