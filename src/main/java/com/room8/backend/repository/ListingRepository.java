package com.room8.backend.repository;

import com.room8.backend.dto.ListingResponse;
import com.room8.backend.entity.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {

    @Query("""
            SELECT new com.room8.backend.dto.ListingResponse(l.title, l.text, u.username, l.createdAt) 
            FROM Listing l 
            JOIN l.user u
            ON l.user.id = u.id
            ORDER BY l.createdAt ASC
            """)
    List<ListingResponse> getAllListings();
}
