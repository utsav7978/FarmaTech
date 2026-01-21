// package com.farmerplatform.service;

// import com.farmerplatform.dto.UserRegistrationDto;
// import com.farmerplatform.dto.UserResponseDto;
// import com.farmerplatform.entity.Role;
// import com.farmerplatform.entity.User;
// import com.farmerplatform.exception.ResourceNotFoundException;
// import com.farmerplatform.exception.UserAlreadyExistsException;
// import com.farmerplatform.repository.UserRepository;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.junit.jupiter.api.extension.ExtendWith;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.junit.jupiter.MockitoExtension;
// import org.springframework.security.crypto.password.PasswordEncoder;

// import java.time.LocalDateTime;
// import java.util.Optional;

// import static org.junit.jupiter.api.Assertions.*;
// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.ArgumentMatchers.anyString;
// import static org.mockito.Mockito.*;

// /**
//  * Unit tests for UserService
//  */
// @ExtendWith(MockitoExtension.class)
// class UserServiceTest {
    
//     @Mock
//     private UserRepository userRepository;
    
//     @Mock
//     private PasswordEncoder passwordEncoder;
    
//     @InjectMocks
//     private UserService userService;
    
//     private UserRegistrationDto registrationDto;
//     private User user;
    
//     @BeforeEach
//     void setUp() {
//         registrationDto = new UserRegistrationDto();
//         registrationDto.setName("John Farmer");
//         registrationDto.setEmail("john@farmer.com");
//         registrationDto.setContact("1234567890");
//         registrationDto.setPassword("password123");
//         registrationDto.setRole(Role.FARMER);
        
//         user = new User();
//         user.setId(1L);
//         user.setName("John Farmer");
//         user.setEmail("john@farmer.com");
//         user.setContact("1234567890");
//         user.setPassword("encodedPassword");
//         user.setRole(Role.FARMER);
//         user.setCreatedAt(LocalDateTime.now());
//         user.setUpdatedAt(LocalDateTime.now());
//     }
    
//     @Test
//     void registerUser_Success() {
//         // Given
//         when(userRepository.existsByEmail(registrationDto.getEmail())).thenReturn(false);
//         when(passwordEncoder.encode(registrationDto.getPassword())).thenReturn("encodedPassword");
//         when(userRepository.save(any(User.class))).thenReturn(user);
        
//         // When
//         UserResponseDto result = userService.registerUser(registrationDto);
        
//         // Then
//         assertNotNull(result);
//         assertEquals(registrationDto.getName(), result.getName());
//         assertEquals(registrationDto.getEmail(), result.getEmail());
//         assertEquals(registrationDto.getRole(), result.getRole());
//         assertEquals(user.getId(), result.getId());
        
//         verify(userRepository).existsByEmail(registrationDto.getEmail());
//         verify(passwordEncoder).encode(registrationDto.getPassword());
//         verify(userRepository).save(any(User.class));
//     }
    
//     @Test
//     void registerUser_UserAlreadyExists_ThrowsException() {
//         // Given
//         when(userRepository.existsByEmail(registrationDto.getEmail())).thenReturn(true);
        
//         // When & Then
//         UserAlreadyExistsException exception = assertThrows(
//             UserAlreadyExistsException.class, 
//             () -> userService.registerUser(registrationDto)
//         );
        
//         assertEquals("User with email " + registrationDto.getEmail() + " already exists", 
//                      exception.getMessage());
        
//         verify(userRepository).existsByEmail(registrationDto.getEmail());
//         verify(userRepository, never()).save(any(User.class));
//         verify(passwordEncoder, never()).encode(anyString());
//     }
    
//     @Test
//     void getUserByEmail_Success() {
//         // Given
//         when(userRepository.findByEmail("john@farmer.com")).thenReturn(Optional.of(user));
        
//         // When
//         User result = userService.getUserByEmail("john@farmer.com");
        
//         // Then
//         assertNotNull(result);
//         assertEquals(user.getEmail(), result.getEmail());
//         assertEquals(user.getName(), result.getName());
//         assertEquals(user.getRole(), result.getRole());
        
//         verify(userRepository).findByEmail("john@farmer.com");
//     }
    
//     @Test
//     void getUserByEmail_UserNotFound_ThrowsException() {
//         // Given
//         String email = "nonexistent@farmer.com";
//         when(userRepository.findByEmail(email)).thenReturn(Optional.empty());
        
//         // When & Then
//         ResourceNotFoundException exception = assertThrows(
//             ResourceNotFoundException.class,
//             () -> userService.getUserByEmail(email)
//         );
        
//         assertEquals("User not found with email: " + email, exception.getMessage());
//         verify(userRepository).findByEmail(email);
//     }
    
//     @Test
//     void getUserById_Success() {
//         // Given
//         when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        
//         // When
//         UserResponseDto result = userService.getUserById(1L);
        
//         // Then
//         assertNotNull(result);
//         assertEquals(user.getId(), result.getId());
//         assertEquals(user.getName(), result.getName());
//         assertEquals(user.getEmail(), result.getEmail());
//         assertEquals(user.getRole(), result.getRole());
        
//         verify(userRepository).findById(1L);
//     }
// }