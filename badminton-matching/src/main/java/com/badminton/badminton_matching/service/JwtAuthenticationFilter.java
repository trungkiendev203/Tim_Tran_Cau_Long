package com.badminton.badminton_matching.service;

import com.badminton.badminton_matching.Repository.UserRepository;
import com.badminton.badminton_matching.entity.User;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(JwtService jwtService,
                                   UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        // 1. Lấy header Authorization từ request
        String authHeader = request.getHeader("Authorization");

        // 2. Nếu không có token hoặc token không bắt đầu bằng "Bearer "
        // thì không kiểm tra JWT nữa, cho request đi tiếp
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 3. Cắt bỏ chữ "Bearer " để lấy token thật
        String token = authHeader.substring(7);

        // 4. Lấy email từ token
        String email = jwtService.extractEmail(token);

        // 5. Nếu lấy được email và hiện tại Spring Security chưa xác thực user nào
        if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {

            // 6. Tìm user trong database bằng email
            User user = userRepository.findByEmail(email)
                    .orElse(null);

            // 7. Nếu user tồn tại và token hợp lệ
            if (user != null && jwtService.isTokenValid(token, user)) {

                // 8. Tạo object xác thực cho Spring Security
                UsernamePasswordAuthenticationToken authentication =
                        new UsernamePasswordAuthenticationToken(
                                user,
                                null,
                                Collections.emptyList()
                        );

                // 9. Gắn thêm thông tin request
                authentication.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );

                // 10. Báo cho Spring Security biết user này đã đăng nhập
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        // 11. Cho request đi tiếp vào Controller
        filterChain.doFilter(request, response);
    }
}