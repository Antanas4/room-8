package com.room8.backend.repositories;

import com.room8.backend.entities.Chat;
import com.room8.backend.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    boolean existsByUniqueKey(String uniqueKey);

    @Query("SELECT m FROM Message m WHERE m.chatRoom.id = :chatId ORDER BY m.timestamp ASC")
    List<Message> findMessagesByChatIdSorted(@Param("chatId") Long chatId);

    List<Chat> findByUniqueKeyContaining(String userId);
}
