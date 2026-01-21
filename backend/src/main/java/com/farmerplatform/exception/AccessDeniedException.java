package com.farmerplatform.exception;

/**
 * Exception thrown when access is denied
 */
public class AccessDeniedException extends RuntimeException {
    public AccessDeniedException(String message) {
        super(message);
    }
}
