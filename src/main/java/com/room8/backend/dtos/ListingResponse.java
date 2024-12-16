package com.room8.backend.dtos;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ListingResponse {
    private String title;
    private String text;
    private String username;

    @JsonIgnore
    private LocalDateTime createdAt;
}
