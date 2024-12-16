package com.room8.backend.services;

import com.room8.backend.dtos.ListingRequest;
import com.room8.backend.dtos.ListingResponse;
import com.room8.backend.entities.Listing;
import com.room8.backend.repositories.ListingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@AllArgsConstructor
public class ListingService {

    private final ListingRepository listingRepository;
    private final SessionService sessionService;

    public void addListing(ListingRequest listingRequest) {
        var user = sessionService.getUserFromSessionId()
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        var listing = Listing.builder()
                .title(listingRequest.getTitle())
                .text(listingRequest.getText())
                .user(user)
                .createdAt(LocalDateTime.now())
                .build();

        listingRepository.save(listing);
    }

    public List<ListingResponse> getAllListings() {
        return listingRepository.getAllListings();
    }
}
