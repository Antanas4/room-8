package com.room8.backend.services;

import com.room8.backend.dtos.LoginUserRequestDto;
import com.room8.backend.dtos.SaveUserRequestDto;
import com.room8.backend.dtos.UserResponseDto;
import com.room8.backend.entities.User;
import com.room8.backend.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final SessionService sessionService;

    public void saveUser(SaveUserRequestDto saveUserRequestDto) {
        if (userRepository.existsByUsername(saveUserRequestDto.getUsername())) {
            throw new IllegalArgumentException("Username already exists");
        }
        if (userRepository.existsByPhoneNumber(saveUserRequestDto.getPhoneNumber())) {
            throw new IllegalArgumentException("Phone number already exists");
        }

        User user = new User();
        user.setUsername(saveUserRequestDto.getUsername());
        user.setPassword(bCryptPasswordEncoder.encode(saveUserRequestDto.getPassword()));
        user.setFirstName(saveUserRequestDto.getFirstName());
        user.setLastName(saveUserRequestDto.getLastName());
        user.setDateOfBirth(saveUserRequestDto.getDateOfBirth());
        user.setPhoneNumber(saveUserRequestDto.getPhoneNumber());
        user.setGender(saveUserRequestDto.getGender());

        userRepository.save(user);
    }

    public UserResponseDto loginUser(LoginUserRequestDto loginUserRequestDto, HttpSession session) {
        User user = userRepository.findByUsername(loginUserRequestDto.getUsername())
                .orElseThrow(() -> new IllegalArgumentException("Invalid Username"));

        if (!bCryptPasswordEncoder.matches(loginUserRequestDto.getPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Invalid Password");
        }

        SecurityContext securityContext = SecurityContextHolder.getContext();
        Authentication authentication = getAuthentication(user, securityContext.getAuthentication());

        SecurityContextHolder.getContext().setAuthentication(authentication);
        session.setAttribute("SPRING_SECURITY_CONTEXT", SecurityContextHolder.getContext());

        return UserResponseDto.builder()
                .id(user.getId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .dateOfBirth(user.getDateOfBirth())
                .phoneNumber(user.getPhoneNumber())
                .gender(user.getGender())
                .build();

    }

    private static Authentication getAuthentication(User user, Authentication existingAuth) {
        if (existingAuth != null && existingAuth.isAuthenticated() && !(existingAuth instanceof AnonymousAuthenticationToken)) {
            throw new IllegalArgumentException("User is already authenticated");
        }

        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority("USER");

        return new UsernamePasswordAuthenticationToken(
                user.getId(),
                user.getPassword(),
                Collections.singletonList(simpleGrantedAuthority));
    }

    public void logoutUser(Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
        SecurityContextLogoutHandler logoutHandler = new SecurityContextLogoutHandler();
        logoutHandler.logout(request, response, authentication);
    }
}
