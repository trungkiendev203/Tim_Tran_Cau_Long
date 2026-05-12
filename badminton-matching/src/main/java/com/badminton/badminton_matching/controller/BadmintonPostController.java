package com.badminton.badminton_matching.controller;

import com.badminton.badminton_matching.dto.BadmintonPost.BadmintonPostResponseDTO;
import com.badminton.badminton_matching.dto.BadmintonPost.CreateBadmintonPostRequestDTO;
import com.badminton.badminton_matching.dto.PostParticipantResponseDTO;
import com.badminton.badminton_matching.service.BadmintonPostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class BadmintonPostController {
    public BadmintonPostController(BadmintonPostService badmintonPostService) {
        this.badmintonPostService = badmintonPostService;
    }

    private final BadmintonPostService badmintonPostService;
    @PostMapping
    public BadmintonPostResponseDTO createPost(@RequestBody CreateBadmintonPostRequestDTO request){
        return badmintonPostService.createPost(request);
    }

    @GetMapping
    public List<BadmintonPostResponseDTO> getAllPosts() {
        return badmintonPostService.getAllPosts();
    }
    @GetMapping("/{id}")
    public BadmintonPostResponseDTO getPostById(@PathVariable String id){
        return badmintonPostService.getPostById(id);
    }
    @PostMapping("/{id}/join-request")
    public String joinRequest(@PathVariable String id){
        return badmintonPostService.joinRequest(id);
    }
    @GetMapping("/{postId}/join-requests")
    public List<PostParticipantResponseDTO> getJoinRequests(
            @PathVariable String postId
    ) {
        return badmintonPostService.getJoinRequests(postId);
    }


}
