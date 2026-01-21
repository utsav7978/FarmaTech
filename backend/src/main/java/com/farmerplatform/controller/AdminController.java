package com.farmerplatform.controller;

import com.farmerplatform.dto.ApiResponse;
import com.farmerplatform.dto.CropResponseDto;
import com.farmerplatform.dto.PurchaseResponseDto;
import com.farmerplatform.dto.UserResponseDto;
import com.farmerplatform.entity.Role;
import com.farmerplatform.service.CropService;
import com.farmerplatform.service.PurchaseService;
import com.farmerplatform.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST Controller for Admin-specific endpoints
 */
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:4200"})
public class AdminController {
    
    private final UserService userService;
    private final CropService cropService;
    private final PurchaseService purchaseService;
    
    /**
     * Get all users
     */
    @GetMapping("/users")
    public ResponseEntity<ApiResponse> getAllUsers() {
        List<UserResponseDto> users = userService.getAllUsers();
        ApiResponse response = new ApiResponse(true, "Users retrieved successfully", users);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    /**
     * Get users by role
     */
    @GetMapping("/users/role/{role}")
    public ResponseEntity<ApiResponse> getUsersByRole(@PathVariable Role role) {
        List<UserResponseDto> users = userService.getUsersByRole(role);
        ApiResponse response = new ApiResponse(true, "Users retrieved successfully", users);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    /**
     * Get user by ID
     */
    @GetMapping("/users/{id}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable Long id) {
        UserResponseDto user = userService.getUserById(id);
        ApiResponse response = new ApiResponse(true, "User retrieved successfully", user);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    /**
     * Delete user
     */
    @DeleteMapping("/users/{id}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        ApiResponse response = new ApiResponse(true, "User deleted successfully");
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
    
    /**
     * Get all crops
     */
    @GetMapping("/crops")
    public ResponseEntity<ApiResponse> getAllCrops() {
        List<CropResponseDto> crops = cropService.getAllCrops();
        ApiResponse response = new ApiResponse(true, "Crops retrieved successfully", crops);
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
    
    /**
     * Get all purchases
     */
    @GetMapping("/purchases")
    public ResponseEntity<ApiResponse> getAllPurchases() {
        List<PurchaseResponseDto> purchases = purchaseService.getAllPurchases();
        ApiResponse response = new ApiResponse(true, "Purchases retrieved successfully", purchases);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}