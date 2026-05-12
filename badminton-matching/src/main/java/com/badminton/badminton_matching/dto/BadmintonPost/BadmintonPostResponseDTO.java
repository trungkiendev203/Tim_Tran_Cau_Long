package com.badminton.badminton_matching.dto.BadmintonPost;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class BadmintonPostResponseDTO {

    private String id;

    private String title;

    private String description;

    private String area;

    private String courtName;

    private LocalDateTime playTime;

    private String level;

    private Integer neededPlayers;

    private Integer currentPlayers;

    private String status;

    private String createdById;

    private String createdByName;

    private LocalDateTime createdAt;
}