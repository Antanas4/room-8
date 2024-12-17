package com.room8.backend.controllers;

import com.room8.backend.dtos.ChatRequestDto;
import com.room8.backend.dtos.MessageRequestDto;
import com.room8.backend.services.ChatService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
@AllArgsConstructor

public class ChatController
{
    private final ChatService chatService;

    @PostMapping("/createChat/{unlockedUserId}")
    public void createChat(@PathVariable Long unlockedUserId){
        chatService.createChat(unlockedUserId);
    }

    @GetMapping("/{chatId}/messages")
    public List<MessageRequestDto> getChatMessages(@PathVariable Long chatId) {
        return chatService.getChatMessages(chatId);
    }

    @GetMapping("/getUsersChats")
    public List<ChatRequestDto> getUsersChats() {
        return chatService.getUsersChats();
    }

}
