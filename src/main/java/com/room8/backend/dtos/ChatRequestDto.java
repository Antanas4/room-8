package com.room8.backend.dtos;

import com.room8.backend.entities.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ChatRequestDto {
    private Long id;
    private Long currentUserId;
    private Long recipientId;
    private List<Message> messages;
    private String uniqueKey;

    public ChatRequestDto(Long id, Long id1, Long recipientId, String uniqueKey) {
        this.id = id;
        this.currentUserId = id1;
        this.recipientId = recipientId;
        this.uniqueKey = uniqueKey;
    }
}
