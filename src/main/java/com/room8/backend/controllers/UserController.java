package com.room8.backend.controllers;

import com.room8.backend.dtos.LoginUserRequestDto;
import com.room8.backend.dtos.SaveUserRequestDto;
import com.room8.backend.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

    private UserService userService;

    @PostMapping("/register")
    public void createUser(@Valid @RequestBody SaveUserRequestDto saveUserRequestDto) {
        userService.saveUser(saveUserRequestDto);
    }

    @PostMapping("/login")
    public void loginUser(@Valid @RequestBody LoginUserRequestDto loginUserRequestDto, HttpSession session) {
        userService.loginUser(loginUserRequestDto, session);
    }

    @PostMapping("/logout")
    public void logoutUser(Authentication authentication, HttpServletRequest request, HttpServletResponse response) {
        userService.logoutUser(authentication, request, response);
    }

}
