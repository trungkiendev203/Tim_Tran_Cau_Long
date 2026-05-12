package com.badminton.badminton_matching.service;

import com.badminton.badminton_matching.Repository.BadmintonPostRepository;
import com.badminton.badminton_matching.Repository.PostParticipantRepository;
import com.badminton.badminton_matching.Repository.UserRepository;
import com.badminton.badminton_matching.dto.BadmintonPost.BadmintonPostResponseDTO;
import com.badminton.badminton_matching.dto.BadmintonPost.CreateBadmintonPostRequestDTO;
import com.badminton.badminton_matching.dto.PostParticipantResponseDTO;
import com.badminton.badminton_matching.entity.BadmintonPost;
import com.badminton.badminton_matching.entity.PostParticipant;
import com.badminton.badminton_matching.entity.User;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;


import static org.springframework.http.RequestEntity.post;

@Service
public class BadmintonPostService {
    private final BadmintonPostRepository badmintonPostRepository;
    private final UserRepository userRepository;
    public  final PostParticipantRepository postParticipantRepository;
    public BadmintonPostService(BadmintonPostRepository badmintonPostRepository, UserRepository userRepository,PostParticipantRepository postParticipantRepository) {
        this.badmintonPostRepository = badmintonPostRepository;
        this.userRepository = userRepository;
        this.postParticipantRepository = postParticipantRepository;
    }
    private BadmintonPostResponseDTO mapToResponse(BadmintonPost post) {
        return BadmintonPostResponseDTO.builder()
                .id(post.getId())
                .title(post.getTitle())
                .description(post.getDescription())
                .area(post.getArea())
                .courtName(post.getCourtName())
                .playTime(post.getPlayTime())
                .level(post.getLevel())
                .neededPlayers(post.getNeededPlayers())
                .currentPlayers(post.getCurrentPlayers())
                .status(post.getStatus())
                .createdById(post.getCreatedBy().getId())
                .createdByName(post.getCreatedBy().getFullName())
                .createdAt(post.getCreatedAt())
                .build();
    }
    public BadmintonPostResponseDTO createPost(CreateBadmintonPostRequestDTO request){

        User currentUser = (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        BadmintonPost post = BadmintonPost.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .area(request.getArea())
                .courtName(request.getCourtName())
                .playTime(request.getPlayTime())
                .level(request.getLevel())
                .neededPlayers(request.getNeededPlayers())
                .currentPlayers(0)
                .status("OPEN")
                .createdBy(currentUser)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        BadmintonPost savedPost = badmintonPostRepository.save(post);

        return mapToResponse(savedPost);
    }
    public List<BadmintonPostResponseDTO> getAllPosts() {
        return badmintonPostRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    public BadmintonPostResponseDTO getPostById(String id) {
        BadmintonPost badmintonPost = badmintonPostRepository.findById(id).orElseThrow(() -> new RuntimeException("Không tìm thấy bài đăng"));
        return mapToResponse(badmintonPost);
    }
    public String joinRequest(String postId){
        User currentUser = (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();
        BadmintonPost post = badmintonPostRepository.findById(postId).orElseThrow(() -> new RuntimeException("Không có bài đăng"));
                if(!post.getStatus().equals("OPEN")){
                    throw new RuntimeException("hông cho xin tham gia nữa");
                }else if(post.getCreatedBy().getId().equals(currentUser.getId())){
            throw new RuntimeException("Không thể tham gia bài của chính mình");
        }
        PostParticipant participant = PostParticipant.builder()
                .post(post)
                .user(currentUser)
                .status("PENDING")
                .joinedAt(LocalDateTime.now())
                .build();

        postParticipantRepository.save(participant);

        return "Đã gửi yêu cầu tham gia";

    }
    private PostParticipantResponseDTO mapParticipantToResponse(PostParticipant participant) {
        return PostParticipantResponseDTO.builder()
                .id(participant.getId())
                .userId(participant.getUser().getId())
                .fullName(participant.getUser().getFullName())
                .status(participant.getStatus())
                .joinedAt(participant.getJoinedAt())
                .build();
    }

    public List<PostParticipantResponseDTO> getJoinRequests(String postId) {
        BadmintonPost post = badmintonPostRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy bài đăng"));

        User currentUser = (User) SecurityContextHolder.getContext()
                .getAuthentication()
                .getPrincipal();

        if (!post.getCreatedBy().getId().equals(currentUser.getId())) {
            throw new RuntimeException("Bạn không có quyền xem yêu cầu của bài này");
        }

        return postParticipantRepository.findByPostIdAndStatus(postId, "PENDING")
                .stream()
                .map(this::mapParticipantToResponse)
                .toList();
    }
}
