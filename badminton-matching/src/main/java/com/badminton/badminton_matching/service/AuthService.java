package com.badminton.badminton_matching.service;

import com.badminton.badminton_matching.Repository.UserRepository;
import com.badminton.badminton_matching.dto.UserResponseDTO;
import com.badminton.badminton_matching.dto.auth.LoginDTO;
import com.badminton.badminton_matching.dto.auth.LoginResponseDTO;
import com.badminton.badminton_matching.dto.auth.RegisterDTO;
import com.badminton.badminton_matching.entity.User;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder,JwtService jwtService ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponseDTO register(RegisterDTO request) {
        if (request.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email không được để trống");
        } else if (!request.getEmail().contains("@")) {
            throw new RuntimeException("Email chưa hợp lệ");
        } else if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email đã tồn tại");
        } else if (request.getFullName().trim().isEmpty()) {
            throw new RuntimeException("Tên không được để trống");
        } else if (request.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password không được để trống");
        } else if (request.getPassword().length() <= 6) {
            throw new RuntimeException("Password phải hơn 5 kí tự");
        } else if (request.getPhone().trim().isEmpty()) {
            throw new RuntimeException("Phone không được để trống");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPhone(request.getPhone());

        User savedUser = userRepository.save(user);
        LoginResponseDTO response = new LoginResponseDTO();
        response.setUserId(savedUser.getId());
        response.setEmail(savedUser.getEmail());
        response.setFullName(savedUser.getFullName());
        response.setToken(jwtService.generateToken(savedUser));

        return response;

    }

    public LoginResponseDTO login(LoginDTO request) {
        if (request.getEmail().trim().isEmpty()) {
            throw new RuntimeException("Email không được để trống");
        }

        if (!request.getEmail().contains("@")) {
            throw new RuntimeException("Email chưa hợp lệ");
        }

        if (request.getPassword().trim().isEmpty()) {
            throw new RuntimeException("Password không được để trống");
        }

        // Tìm user
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Email không tồn tại"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Sai mật khẩu");
        }
        LoginResponseDTO response = new LoginResponseDTO();
        response.setUserId(user.getId());
        response.setEmail(user.getEmail());
        response.setFullName(user.getFullName());
        response.setToken(jwtService.generateToken(user));
        return response;
    }
    public UserResponseDTO getCurrentUser(User user) {
        UserResponseDTO dto = new UserResponseDTO();

        dto.setId(user.getId());
        dto.setFullName(user.getFullName());
        dto.setEmail(user.getEmail());
        dto.setPhone(user.getPhone());

        return dto;
    }
}
