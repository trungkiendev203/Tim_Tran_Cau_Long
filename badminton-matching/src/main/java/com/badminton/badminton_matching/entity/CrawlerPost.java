package com.badminton.badminton_matching.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "crawler_posts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CrawlerPost {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private String sourceGroup;
    private String content;
    private String authorName;
    private String postUrl;
    private LocalDateTime crawlTime;
    private String status;
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}
