package com.badminton.badminton_matching.Repository;

import com.badminton.badminton_matching.entity.BadmintonPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BadmintonPostRepository
        extends JpaRepository<BadmintonPost, String> {

}