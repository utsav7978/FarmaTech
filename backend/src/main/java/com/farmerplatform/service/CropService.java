package com.farmerplatform.service;

import com.farmerplatform.dto.CropDto;
import com.farmerplatform.dto.CropResponseDto;
import com.farmerplatform.entity.Crop;
import com.farmerplatform.entity.Role;
import com.farmerplatform.entity.User;
import com.farmerplatform.exception.AccessDeniedException;
import com.farmerplatform.exception.ResourceNotFoundException;
import com.farmerplatform.repository.CropRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for Crop-related operations
 */
@Service
@RequiredArgsConstructor
@Transactional
public class CropService {
    
    private final CropRepository cropRepository;
    private final UserService userService;
    
    /**
     * Add new crop (Farmers only)
     */
    public CropResponseDto addCrop(CropDto cropDto, String userEmail) {
        User farmer = userService.getUserByEmail(userEmail);
        
        // Verify user is a farmer
        if (farmer.getRole() != Role.FARMER) {
            throw new AccessDeniedException("Only farmers can add crops");
        }
        
        Crop crop = new Crop();
        crop.setName(cropDto.getName());
        crop.setDescription(cropDto.getDescription());
        crop.setQuantity(cropDto.getQuantity());
        crop.setPrice(cropDto.getPrice());
        crop.setFarmer(farmer);
        
        Crop savedCrop = cropRepository.save(crop);
        return convertToResponseDto(savedCrop);
    }
    
    /**
     * Get all crops (Government Officials, Industrialists, Admin)
     */
    @Transactional(readOnly = true)
    public List<CropResponseDto> getAllCrops() {
        return cropRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Get crops by farmer (Farmer's own crops)
     */
    @Transactional(readOnly = true)
    public List<CropResponseDto> getCropsByFarmer(String userEmail) {
        User farmer = userService.getUserByEmail(userEmail);
        return cropRepository.findByFarmer(farmer)
                .stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Get crop by ID
     */
    @Transactional(readOnly = true)
    public CropResponseDto getCropById(Long id) {
        Crop crop = cropRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Crop not found with id: " + id));
        return convertToResponseDto(crop);
    }
    
    /**
     * Update crop (Farmer's own crops only)
     */
    public CropResponseDto updateCrop(Long id, CropDto cropDto, String userEmail) {
        Crop crop = cropRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Crop not found with id: " + id));
        
        User user = userService.getUserByEmail(userEmail);
        
        // Verify ownership or admin role
        if (!crop.getFarmer().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("You can only update your own crops");
        }
        
        crop.setName(cropDto.getName());
        crop.setDescription(cropDto.getDescription());
        crop.setQuantity(cropDto.getQuantity());
        crop.setPrice(cropDto.getPrice());
        
        Crop updatedCrop = cropRepository.save(crop);
        return convertToResponseDto(updatedCrop);
    }
    
    /**
     * Delete crop (Farmer's own crops or Admin)
     */
    public void deleteCrop(Long id, String userEmail) {
        Crop crop = cropRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Crop not found with id: " + id));
        
        User user = userService.getUserByEmail(userEmail);
        
        // Verify ownership or admin role
        if (!crop.getFarmer().getId().equals(user.getId()) && user.getRole() != Role.ADMIN) {
            throw new AccessDeniedException("You can only delete your own crops");
        }
        
        cropRepository.delete(crop);
    }
    
    /**
     * Get crop entity by ID (internal use)
     */
    @Transactional(readOnly = true)
    public Crop getCropEntityById(Long id) {
        return cropRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Crop not found with id: " + id));
    }
    
    /**
     * Convert Crop entity to CropResponseDto
     */
    private CropResponseDto convertToResponseDto(Crop crop) {
        CropResponseDto dto = new CropResponseDto();
        dto.setId(crop.getId());
        dto.setName(crop.getName());
        dto.setDescription(crop.getDescription());
        dto.setQuantity(crop.getQuantity());
        dto.setPrice(crop.getPrice());
        dto.setFarmerName(crop.getFarmer().getName());
        dto.setFarmerEmail(crop.getFarmer().getEmail());
        dto.setFarmerContact(crop.getFarmer().getContact());
        dto.setCreatedAt(crop.getCreatedAt());
        dto.setUpdatedAt(crop.getUpdatedAt());
        return dto;
    }
}