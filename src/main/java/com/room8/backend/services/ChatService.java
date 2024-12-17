package com.room8.backend.services;

import com.room8.backend.dtos.ChatRequestDto;
import com.room8.backend.dtos.MessageRequestDto;
import com.room8.backend.entities.Chat;
import com.room8.backend.entities.Message;
import com.room8.backend.entities.User;
import com.room8.backend.repositories.ChatRepository;
import com.room8.backend.repositories.MessageRepository;
import com.room8.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ChatService {

    private final UserRepository userRepository;
    private final SessionService sessionService;
    private final ChatRepository chatRepository;

    public void createChat(Long unlockedUserId) {
        User currentUser = sessionService.getUserFromSessionId()
                .orElseThrow(() -> new IllegalArgumentException("Current logged in user is not found"));
        User unlockedUser = userRepository.findById(unlockedUserId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + unlockedUserId));

        String uniqueKey = generateUniqueKey(currentUser.getId(), unlockedUser.getId());

        if (chatRepository.existsByUniqueKey(uniqueKey)) {
            throw new IllegalStateException("Chat already exists");
        }

        Chat chat = new Chat();
        chat.setUniqueKey(uniqueKey);
        chatRepository.save(chat);
    }

    private String generateUniqueKey(Long userId1, Long userId2) {
        return userId1 < userId2
                ? userId1 + "+" + userId2
                : userId2 + "+" + userId1;
    }


    public List<MessageRequestDto> getChatMessages(Long chatId) {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new IllegalArgumentException("Chat not found with ID: " + chatId));
        List<Message> messages = chatRepository.findMessagesByChatIdSorted(chatId);

        return messages.stream()
                .map(message -> new MessageRequestDto(
                        message.getReceiver().getId(),
                        message.getSender().getId(),
                        message.getBody(),
                        message.getTimestamp().toString(),
                        message.getChatRoom().getId()
                ))
                .toList();

    }

    public List<ChatRequestDto> getUsersChats() {
        User currentUser = sessionService.getUserFromSessionId()
                .orElseThrow(() -> new IllegalArgumentException("Current logged in user is not found"));

        List<Chat> chats = chatRepository.findByUniqueKeyContaining(String.valueOf(currentUser.getId()));

        return chats.stream()
                .map(chat -> {
                    String[] users = chat.getUniqueKey().split("\\+");
                    Long recipientId = Long.parseLong(users[0].equals(String.valueOf(currentUser.getId())) ? users[1] : users[0]);

                    return new ChatRequestDto(
                            chat.getId(),
                            currentUser.getId(),
                            recipientId,
                            chat.getUniqueKey()
                    );
                })
                .toList();
    }
}
