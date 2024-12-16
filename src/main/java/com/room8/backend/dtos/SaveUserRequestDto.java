package com.room8.backend.dtos;

import com.room8.backend.entities.Gender;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SaveUserRequestDto {

    @NotNull(message = "First name needs to be provided")
    @Pattern(regexp = "^[^A-Za-z]*[A-Za-z].*$", message = "First name must contain at least one English letter")
    private String username;

    @NotNull(message = "Password needs to be provided")
    @Size(min = 8, message = "Password must be at least 8 characters long")
    @Pattern(regexp = "^(?=.*[&#!%])(?=.*\\d).*$", message = "Password must contain a special character and a digit")
    private String password;

    @NotNull(message = "Email needs to be provided")
    @Pattern(regexp = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$", message = "Invalid email format")
    private String email;

    @NotNull(message = "First name needs to be provided")
    @Pattern(regexp = "^[^A-Za-z]*[A-Za-z].*$", message = "First name must contain at least one English letter")
    private String firstName;

    @NotNull(message = "Last name needs to be provided")
    @Pattern(regexp = "^[^A-Za-z]*[A-Za-z].*$", message = "Last name must contain at least one English letter")
    private String lastName;

    @NotNull(message = "Date of birth needs to be provided")
    private Date dateOfBirth;

    @NotNull(message = "Phone number needs to be provided")
    @Pattern(regexp = "^[0-9]*$", message = "Phone number must contain only digits")
    private String phoneNumber;

    @NotNull(message = "Gender needs to be provided")
    private Gender gender;

}
