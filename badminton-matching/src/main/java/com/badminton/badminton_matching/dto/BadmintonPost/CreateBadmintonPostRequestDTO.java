package com.badminton.badminton_matching.dto.BadmintonPost;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateBadmintonPostRequestDTO {

    private String title;

    private String description;

    private String area;

    private String courtName;

    private LocalDateTime playTime;

    private String level;

    private Integer neededPlayers;
}
