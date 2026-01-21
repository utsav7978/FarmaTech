package com.farmerplatform.controller;

import com.farmerplatform.dto.ApiResponse;
import com.farmerplatform.dto.CropResponseDto;
import com.farmerplatform.service.CropService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Public endpoints (no authentication required)
 */
@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
public class PublicController {
    
    private final CropService cropService;
    
    /**
     * Public endpoint to view all available crops
     */
    @GetMapping("/crops")
    public ResponseEntity<ApiResponse> getAllCropsPublic() {
        List<CropResponseDto> crops = cropService.getAllCrops();
        ApiResponse response = new ApiResponse(true, "Crops retrieved successfully", crops);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    /**
     * Health check endpoint
     */
    @GetMapping("/health")
    public ResponseEntity<ApiResponse> healthCheck() {
        ApiResponse response = new ApiResponse(true, "Application is running successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}