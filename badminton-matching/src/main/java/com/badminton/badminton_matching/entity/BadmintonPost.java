package com.badminton.badminton_matching.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import lombok.Builder;
@Builder
@Entity
@Table(name = "badminton_posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BadmintonPost {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id", nullable = false, updatable = false)
    private String id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    @Column(name = "area")
    private String area;

    @Column(name = "court_name")
    private String courtName;
    @ManyToOne
    @JoinColumn(name = "court_id")
    private Court court;
    @Column(name = "play_time")
    private LocalDateTime playTime;

    @Column(name = "level")
    private String level;

    @Column(name = "needed_players")
    private int neededPlayers;

    @Column(name = "current_players")
    private int currentPlayers;

    @Column(name = "status")
    private String status;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private User createdBy;
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}