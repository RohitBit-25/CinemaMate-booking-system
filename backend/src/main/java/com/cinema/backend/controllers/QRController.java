package com.cinema.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/qr")
@CrossOrigin(origins = "http://localhost:3000")
public class QRController {

    @PostMapping("/verify")
    public ResponseEntity<Map<String, Object>> verifyQR(@RequestBody Map<String, String> request) {
        Map<String, Object> response = new HashMap<>();
        
        String qrData = request.get("qrData");
        
        if (qrData == null || qrData.isEmpty()) {
            response.put("success", false);
            response.put("message", "Invalid QR code data");
            return ResponseEntity.badRequest().body(response);
        }
        
        // Simulate QR verification logic
        if (qrData.contains("TICKET_") && qrData.contains("MOVIE")) {
            response.put("success", true);
            response.put("message", "Ticket verified successfully");
            response.put("ticketId", extractTicketId(qrData));
            response.put("movieId", extractMovieId(qrData));
            response.put("entryApproved", true);
        } else {
            response.put("success", false);
            response.put("message", "Invalid ticket QR code");
            response.put("entryApproved", false);
        }
        
        return ResponseEntity.ok(response);
    }
    
    private String extractTicketId(String qrData) {
        try {
            return qrData.split("_")[1];
        } catch (Exception e) {
            return "UNKNOWN";
        }
    }
    
    private String extractMovieId(String qrData) {
        try {
            String[] parts = qrData.split("_");
            if (parts.length >= 3) {
                return parts[2].replace("MOVIE", "");
            }
            return "UNKNOWN";
        } catch (Exception e) {
            return "UNKNOWN";
        }
    }
}
