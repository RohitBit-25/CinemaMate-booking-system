package com.cinema.backend.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/v1")
public class TicketVerificationController {

    @PostMapping("/verify-ticket")
    public ResponseEntity<Map<String, Object>> verifyTicket(@RequestBody Map<String, Object> ticketData) {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Extract ticket information
            String bookingId = (String) ticketData.get("bookingId");
            String verification = (String) ticketData.get("verification");
            // String cinemaName = (String) ticketData.get("cinemaName"); // Removed unused variable
            
            // Basic validation
            if (bookingId != null && "VALID_TICKET".equals(verification)) {
                // Check for valid cinema name
                if (!"CinemaMate".equals(ticketData.get("cinemaName"))) {
                    response.put("valid", false);
                    response.put("message", "Invalid Cinema Name");
                    response.put("status", "INVALID_CINEMA");
                    return ResponseEntity.badRequest().body(response);
                }
                response.put("valid", true);
                response.put("message", "Ticket is valid and verified");
                response.put("ticketInfo", ticketData);
                response.put("verificationTime", java.time.LocalDateTime.now().toString());
                response.put("status", "VERIFIED");
                
                return ResponseEntity.ok(response);
            } else {
                response.put("valid", false);
                response.put("message", "Invalid ticket or verification failed");
                response.put("status", "INVALID");
                
                return ResponseEntity.badRequest().body(response);
            }
            
        } catch (Exception e) {
            response.put("valid", false);
            response.put("message", "Error processing ticket verification");
            response.put("error", e.getMessage());
            response.put("status", "ERROR");
            
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    @GetMapping("/ticket-stats")
    public ResponseEntity<Map<String, Object>> getTicketStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalTicketsVerified", 0);
        stats.put("validTickets", 0);
        stats.put("invalidTickets", 0);
        stats.put("lastVerification", null);
        
        return ResponseEntity.ok(stats);
    }
}