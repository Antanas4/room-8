package com.room8.backend.repositories;

import com.room8.backend.dtos.ListingResponse;
import com.room8.backend.entities.Listing;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListingRepository extends JpaRepository<Listing, Long> {

    @Query("""
            SELECT new com.room8.backend.dtos.ListingResponse(l.title, l.text, u.username, l.createdAt) 
            FROM Listing l 
            JOIN l.user u
            ON l.user.id = u.id
            ORDER BY l.createdAt ASC
            """)
    List<ListingResponse> getAllListings();

    @Query("SELECT l FROM Listing l WHERE l.title LIKE %:search%")
    List<Listing> findListingByTitle(@Param("search") String search);
}
