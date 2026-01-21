package com.farmerplatform.repository;

import com.farmerplatform.entity.Purchase;
import com.farmerplatform.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repository interface for Purchase entity
 */
@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {
    
    List<Purchase> findByBuyer(User buyer);
    
    List<Purchase> findByCropFarmer(User farmer);
    
    List<Purchase> findAllByOrderByTimestampDesc();
}