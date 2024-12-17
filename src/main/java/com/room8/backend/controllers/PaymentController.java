package com.room8.backend.controllers;

import com.room8.backend.services.PaymentService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/payment")
@AllArgsConstructor
public class PaymentController {

    private PaymentService paymentService;

    @PostMapping("/make-payment/{listingId}")
    public void makePayment(@PathVariable Long listingId) {
        paymentService.makePayment(listingId);
    }

}
