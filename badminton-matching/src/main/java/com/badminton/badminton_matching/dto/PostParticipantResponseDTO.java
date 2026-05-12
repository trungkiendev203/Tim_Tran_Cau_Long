package com.badminton.badminton_matching.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class PostParticipantResponseDTO {
    private String id;
    private String userId;
    private String fullName;
    private String status;
    private LocalDateTime joinedAt;
}
