package com.room8.backend.dtos;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginUserRequestDto {

    @NotNull(message = "A Username must be provided")
    private String username;

    @NotNull(message = "A Password must be provided")
    private String password;

}
