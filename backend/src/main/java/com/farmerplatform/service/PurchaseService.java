package com.farmerplatform.service;

import com.farmerplatform.dto.PurchaseDto;
import com.farmerplatform.dto.PurchaseResponseDto;
import com.farmerplatform.entity.Crop;
import com.farmerplatform.entity.Purchase;
import com.farmerplatform.entity.Role;
import com.farmerplatform.entity.User;
import com.farmerplatform.exception.AccessDeniedException;
import com.farmerplatform.exception.InsufficientQuantityException;
import com.farmerplatform.repository.PurchaseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Service class for Purchase-related operations
 */
@Service
@RequiredArgsConstructor
@Transactional
public class PurchaseService {
    
    private final PurchaseRepository purchaseRepository;
    private final UserService userService;
    private final CropService cropService;
    
    /**
     * Create purchase request (Government Officials and Industrialists only)
     */
    public PurchaseResponseDto createPurchase(PurchaseDto purchaseDto, String userEmail) {
        User buyer = userService.getUserByEmail(userEmail);
        
        // Verify buyer role
        if (buyer.getRole() != Role.GOVERNMENT_OFFICIAL && buyer.getRole() != Role.INDUSTRIALIST) {
            throw new AccessDeniedException("Only Government Officials and Industrialists can make purchases");
        }
        
        Crop crop = cropService.getCropEntityById(purchaseDto.getCropId());
        
        // Check if requested quantity is available
        if (crop.getQuantity().compareTo(purchaseDto.getQuantity()) < 0) {
            throw new InsufficientQuantityException("Insufficient crop quantity available. Available: " + 
                crop.getQuantity() + " kg, Requested: " + purchaseDto.getQuantity() + " kg");
        }
        
        // Create purchase record
        Purchase purchase = new Purchase();
        purchase.setCrop(crop);
        purchase.setBuyer(buyer);
        purchase.setQuantity(purchaseDto.getQuantity());
        
        Purchase savedPurchase = purchaseRepository.save(purchase);
        
        // Update crop quantity (subtract purchased quantity)
        crop.setQuantity(crop.getQuantity().subtract(purchaseDto.getQuantity()));
        // The crop will be updated automatically due to the transaction
        
        return convertToResponseDto(savedPurchase);
    }
    
    /**
     * Get all purchases (Admin only)
     */
    @Transactional(readOnly = true)
    public List<PurchaseResponseDto> getAllPurchases() {
        return purchaseRepository.findAllByOrderByTimestampDesc()
                .stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Get purchases by buyer
     */
    @Transactional(readOnly = true)
    public List<PurchaseResponseDto> getPurchasesByBuyer(String userEmail) {
        User buyer = userService.getUserByEmail(userEmail);
        return purchaseRepository.findByBuyer(buyer)
                .stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Get purchases for farmer's crops
     */
    @Transactional(readOnly = true)
    public List<PurchaseResponseDto> getPurchasesForFarmer(String userEmail) {
        User farmer = userService.getUserByEmail(userEmail);
        return purchaseRepository.findByCropFarmer(farmer)
                .stream()
                .map(this::convertToResponseDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Convert Purchase entity to PurchaseResponseDto
     */
    private PurchaseResponseDto convertToResponseDto(Purchase purchase) {
        PurchaseResponseDto dto = new PurchaseResponseDto();
        dto.setId(purchase.getId());
        dto.setCropName(purchase.getCrop().getName());
        dto.setFarmerName(purchase.getCrop().getFarmer().getName());
        dto.setBuyerName(purchase.getBuyer().getName());
        dto.setQuantity(purchase.getQuantity());
        dto.setTotalPrice(purchase.getQuantity().multiply(purchase.getCrop().getPrice()));
        dto.setTimestamp(purchase.getTimestamp());
        return dto;
    }
}