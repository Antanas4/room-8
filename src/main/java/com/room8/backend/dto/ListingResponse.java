package com.room8.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ListingResponse {
    private String title;
    private String text;
    private String username;
    private LocalDateTime createdAt;
}
