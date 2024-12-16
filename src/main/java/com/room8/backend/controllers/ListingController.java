package com.room8.backend.controllers;

import com.room8.backend.dtos.ListingRequest;
import com.room8.backend.dtos.ListingResponse;
import com.room8.backend.services.ListingService;
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
