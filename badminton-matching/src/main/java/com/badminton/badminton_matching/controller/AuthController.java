package com.badminton.badminton_matching.controller;

import com.badminton.badminton_matching.dto.UserResponseDTO;
import com.badminton.badminton_matching.dto.auth.LoginDTO;
import com.badminton.badminton_matching.dto.auth.LoginResponseDTO;
import com.badminton.badminton_matching.dto.auth.RegisterDTO;
import com.badminton.badminton_matching.entity.User;
import com.badminton.badminton_matching.service.AuthService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }
    @PostMapping("/register")
    public LoginResponseDTO register(@RequestBody RegisterDTO request) {
        return authService.register(request);
    }
    @PostMapping("/login")

    public LoginResponseDTO login(@RequestBody LoginDTO request) {
        return authService.login(request);
    }
    @GetMapping("/me")
    public UserResponseDTO me(Authentication authentication) {
        User user = (User) authentication.getPrincipal();
        return authService.getCurrentUser(user);
    }
}