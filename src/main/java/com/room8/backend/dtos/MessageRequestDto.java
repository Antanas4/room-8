package com.room8.backend.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class MessageRequestDto {
    private Long receiverId;
    private Long senderId;
    private String body;
    private String timestamp;
    private Long chatRoomId;
}
