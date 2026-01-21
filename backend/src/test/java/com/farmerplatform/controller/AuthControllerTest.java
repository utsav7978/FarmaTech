// package com.farmerplatform.controller;

// import com.farmerplatform.dto.*;
// import com.farmerplatform.entity.Role;
// import com.farmerplatform.service.AuthService;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
// import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
// import org.springframework.boot.test.mock.mockito.MockBean;
// import org.springframework.context.annotation.Import;
// import org.springframework.http.MediaType;
// import org.springframework.test.context.TestPropertySource;
// import org.springframework.test.web.servlet.MockMvc;

// import java.time.LocalDateTime;

// import static org.mockito.ArgumentMatchers.any;
// import static org.mockito.Mockito.when;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

// /**
//  * Integration tests for AuthController
//  */
// @WebMvcTest(AuthController.class)
// @AutoConfigureWebMvc
// @TestPropertySource(properties = {
//     "spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration"
// })
// class AuthControllerTest {
    
//     @Autowired
//     private MockMvc mockMvc;
    
//     @MockBean
//     private AuthService authService;
    
//     @Autowired
//     private ObjectMapper objectMapper;
    
//     @Test
//     void register_ValidRequest_ReturnsCreated() throws Exception {
//         // Given
//         UserRegistrationDto registrationDto = new UserRegistrationDto();
//         registrationDto.setName("John Farmer");
//         registrationDto.setEmail("john@farmer.com");
//         registrationDto.setContact("1234567890");
//         registrationDto.setPassword("password123");
//         registrationDto.setRole(Role.FARMER);
        
//         UserResponseDto userResponse = new UserResponseDto();
//         userResponse.setId(1L);
//         userResponse.setName("John Farmer");
//         userResponse.setEmail("john@farmer.com");
//         userResponse.setContact("1234567890");
//         userResponse.setRole(Role.FARMER);
//         userResponse.setCreatedAt(LocalDateTime.now());
        
//         when(authService.register(any(UserRegistrationDto.class))).thenReturn(userResponse);
        
//         // When & Then
//         mockMvc.perform(post("/api/auth/register")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(registrationDto)))
//                 .andExpect(status().isCreated())
//                 .andExpect(jsonPath("$.success").value(true))
//                 .andExpect(jsonPath("$.message").value("User registered successfully"))
//                 .andExpect(jsonPath("$.data.name").value("John Farmer"));
//     }
    
//     @Test
//     void login_ValidRequest_ReturnsOk() throws Exception {
//         // Given
//         LoginDto loginDto = new LoginDto();
//         loginDto.setEmail("john@farmer.com");
//         loginDto.setPassword("password123");
        
//         UserResponseDto userResponse = new UserResponseDto();
//         userResponse.setId(1L);
//         userResponse.setName("John Farmer");
//         userResponse.setEmail("john@farmer.com");
//         userResponse.setContact("1234567890");
//         userResponse.setRole(Role.FARMER);
//         userResponse.setCreatedAt(LocalDateTime.now());
        
//         JwtResponseDto jwtResponse = new JwtResponseDto("test-jwt-token", userResponse);
        
//         when(authService.login(any(LoginDto.class))).thenReturn(jwtResponse);
        
//         // When & Then
//         mockMvc.perform(post("/api/auth/login")
//                 .contentType(MediaType.APPLICATION_JSON)
//                 .content(objectMapper.writeValueAsString(loginDto)))
//                 .andExpect(status().isOk())
//                 .andExpect(jsonPath("$.success").value(true))
//                 .andExpect(jsonPath("$.message").value("Login successful"))
//                 .andExpect(jsonPath("$.data.token").value("test-jwt-token"));
//     }
// }