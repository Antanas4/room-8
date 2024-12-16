package com.room8.backend.controller;

import com.room8.backend.dto.ListingRequest;
import com.room8.backend.dto.ListingResponse;
import com.room8.backend.service.ListingService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/listing")
@AllArgsConstructor
public class ListingController {

    private final ListingService listingService;

    @PostMapping
    public ResponseEntity<Void> addListing(@RequestBody ListingRequest listingRequest) {
        listingService.addListing(listingRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<ListingResponse>> getAllListings() {
        return ResponseEntity.status(HttpStatus.OK).body(listingService.getAllListings());
    }
}
