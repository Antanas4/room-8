package com.room8.backend.services;

import com.room8.backend.entities.User;
import com.room8.backend.repositories.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SessionService {

    private UserRepository userRepository;

    public Long getIdFromSession() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return Long.valueOf(authentication.getName());
    }

    public Optional<User> getUserFromSessionId() {
        return userRepository.findById(getIdFromSession());
    }

}
