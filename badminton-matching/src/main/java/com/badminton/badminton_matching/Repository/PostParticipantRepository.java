package com.badminton.badminton_matching.Repository;

import com.badminton.badminton_matching.entity.PostParticipant;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PostParticipantRepository extends JpaRepository<PostParticipant,String> {
        List<PostParticipant> findByPostIdAndStatus(String postId, String status);
}
