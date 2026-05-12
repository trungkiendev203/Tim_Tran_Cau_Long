package com.badminton.badminton_matching.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponseDTO {
    private String id;
    private String fullName;
    private String email;
    private String phone;

    public UserResponseDTO(String id, String fullName, String email, String phone, String role) {
    }
}
