package com.room8.backend.controllers;

import com.room8.backend.dtos.LoginUserRequestDto;
import com.room8.backend.dtos.SaveUserRequestDto;
import com.room8.backend.dtos.UserResponseDto;
import com.room8.backend.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/users")
@AllArgsConstructor
public class UserController {

    private UserService userService;

    @PostMapping("/register")
    public void createUser(@Valid @RequestBody SaveUserRequestDto saveUserRequestDto) {
        userService.saveUser(saveUserRequestDto);
    }

    @PostMapping("/login")
    public UserResponseDto loginUser(@Valid @RequestBody LoginUserRequestDto loginUserRequestDto, HttpSession session) {
        return userService.loginUser(loginUserRequestDto, session);
    }

    @PostMapping("/logout")
    public void logoutUser(Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
        userService.logoutUser(authentication, request, response);
    }

}
