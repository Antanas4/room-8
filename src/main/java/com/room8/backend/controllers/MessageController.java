package com.room8.backend.controllers;

import com.room8.backend.dtos.MessageRequestDto;
import com.room8.backend.services.MessageService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/message")
@AllArgsConstructor

public class MessageController {
    private final MessageService messageService;

    @PostMapping("/sendMessage")
    public void sendMessage(@RequestBody MessageRequestDto messageRequestDto){
        messageService.sendMessage(messageRequestDto);

    }
}
