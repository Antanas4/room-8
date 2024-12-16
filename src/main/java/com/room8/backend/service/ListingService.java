package com.room8.backend.service;

import com.room8.backend.dto.ListingRequest;
import com.room8.backend.dto.ListingResponse;
import com.room8.backend.entity.Listing;
import com.room8.backend.repository.ListingRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ListingService {

    private final ListingRepository listingRepository;

    public void addListing(ListingRequest listingRequest) {
        var listing = Listing.builder()
                .title(listingRequest.getTitle())
                .text(listingRequest.getText())
                .build();

        listingRepository.save(listing);
    }

    public List<ListingResponse> getAllListings() {
        return listingRepository.getAllListings();
    }
}
