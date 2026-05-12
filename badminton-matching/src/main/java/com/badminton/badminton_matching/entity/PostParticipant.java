package com.badminton.badminton_matching.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "post_participants")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PostParticipant {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private BadmintonPost post;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "status")
    private String status; // PENDING, ACCEPTED, REJECTED, CANCELLED

    @Column(name = "joined_at")
    private LocalDateTime joinedAt;
}
