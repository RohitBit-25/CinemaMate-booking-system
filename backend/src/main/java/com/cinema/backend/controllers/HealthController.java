package com.cinema.backend.controllers;

import com.cinema.backend.repositories.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.sql.DataSource;
import java.sql.Connection;
import java.util.HashMap;
import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
public class HealthController {

    @Autowired
    private DataSource dataSource;

    @Autowired
    private OrderRepository orderRepository;

    @GetMapping("/api/v1/health")
    public ResponseEntity<?> healthCheck() {
        Map<String, Object> health = new HashMap<>();
        try {
            Connection connection = dataSource.getConnection();
            health.put("database", "connected");
            health.put("catalog", connection.getCatalog());
            connection.close();
            health.put("status", "OK");
            return ResponseEntity.ok(health);
        } catch (Exception e) {
            health.put("database", "failed");
            health.put("error", e.getMessage());
            health.put("cause", e.getCause() != null ? e.getCause().getMessage() : "null");
            health.put("status", "ERROR");
            return ResponseEntity.internalServerError().body(health);
        }
    }

    @GetMapping("/api/v1/health/orders")
    public ResponseEntity<?> testOrders() {
        Map<String, Object> result = new HashMap<>();
        try {
            long count = orderRepository.count();
            result.put("orderCount", count);
            result.put("status", "OK");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            result.put("status", "ERROR");
            result.put("error", e.getMessage());
            result.put("errorClass", e.getClass().getName());
            if (e.getCause() != null) {
                result.put("cause", e.getCause().getMessage());
                result.put("causeClass", e.getCause().getClass().getName());
            }
            e.printStackTrace();
            return ResponseEntity.internalServerError().body(result);
        }
    }
}
