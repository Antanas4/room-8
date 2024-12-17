package com.room8.backend.services;

import com.room8.backend.entities.Payment;
import com.room8.backend.repositories.ListingRepository;
import com.room8.backend.repositories.PaymentRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class PaymentService {

    private PaymentRepository paymentRepository;
    private ListingRepository listingRepository;
    private SessionService sessionService;

    public void makePayment(Long listingId) {
        Long userId = sessionService.getUserFromSessionId().orElseThrow(() -> new RuntimeException("User not found")).getId();

        if (paymentRepository.findByUserIdAndListingId(userId, listingId).isPresent()) {
            throw new IllegalArgumentException("User has already paid for this listing");
        }

        Payment payment = new Payment();
        payment.setAmount(0.99);
        payment.setPaid(true);
        payment.setListing(listingRepository.findById(listingId).orElseThrow(() ->
                new IllegalArgumentException("Listing not found")));

        payment.setUser(sessionService.getUserFromSessionId().orElseThrow(() ->
                new IllegalArgumentException("User not found")));

        paymentRepository.save(payment);
    }

}
