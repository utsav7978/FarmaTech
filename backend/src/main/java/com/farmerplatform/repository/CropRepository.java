package com.farmerplatform.repository;

import com.farmerplatform.entity.Crop;
import com.farmerplatform.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Crop entity
 */
@Repository
public interface CropRepository extends JpaRepository<Crop, Long> {
    
    List<Crop> findByFarmer(User farmer);
    
    List<Crop> findByFarmerId(Long farmerId);
    
    List<Crop> findAllByOrderByCreatedAtDesc();
}