package com.farmerplatform.exception;

/**
 * Exception thrown when insufficient crop quantity is available
 */
public class InsufficientQuantityException extends RuntimeException {
    public InsufficientQuantityException(String message) {
        super(message);
    }
}