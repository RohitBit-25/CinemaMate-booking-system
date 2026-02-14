package com.cinema.backend.controllers;

import com.cinema.backend.models.Order;
import com.cinema.backend.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @PostMapping("/api/v1/order")
    Order newOrder(@RequestBody Order newOrder) {
        System.out.println("=== POST /order ===");
        System.out.println("Order received: " + newOrder);
        Order savedOrder = orderRepository.save(newOrder);
        System.out.println("Order saved with ID: " + savedOrder.getOrderId());
        return savedOrder;
    }

    @GetMapping("/api/v1/order/{userId}")
    Optional<Order> getLastOrderByUserId(@PathVariable Long userId) {
        return orderRepository.findFirstByCustomerIdOrderByCreatedAtDesc(userId);
    }

    @GetMapping("/api/v1/orders")
    public ResponseEntity<?> getAllOrders() {
        try {
            return ResponseEntity.ok(orderRepository.findAll());
        } catch (Throwable e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(e.getMessage());
        }
    }
}
