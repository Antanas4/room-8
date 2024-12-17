package com.room8.backend.services;

import com.room8.backend.dtos.MessageRequestDto;
import com.room8.backend.entities.Chat;
import com.room8.backend.entities.Message;
import com.room8.backend.entities.User;
import com.room8.backend.repositories.ChatRepository;
import com.room8.backend.repositories.MessageRepository;
import com.room8.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor

public class MessageService {

    private final MessageRepository messageRepository;
    private final UserRepository userRepository;
    private final ChatRepository chatRepository;

    public void sendMessage(MessageRequestDto messageRequestDto) {
        User receiver = userRepository.findById(messageRequestDto.getReceiverId())
                .orElseThrow(() -> new IllegalArgumentException("Receiver not found with ID: " + messageRequestDto.getReceiverId()));

        User sender = userRepository.findById(messageRequestDto.getSenderId())
                .orElseThrow(() -> new IllegalArgumentException("Sender not found with ID: " + messageRequestDto.getSenderId()));
        Chat chat = chatRepository.findById(messageRequestDto.getChatRoomId())
                .orElseThrow(() -> new IllegalArgumentException("Chat not found with ID: " + messageRequestDto.getChatRoomId()));

        Message message = new Message();
        message.setReceiver(receiver);
        message.setSender(sender);
        message.setBody(messageRequestDto.getBody());
        message.setChatRoom(chat);
        messageRepository.save(message);
    }
}
