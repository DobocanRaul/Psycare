package com.psycare.controller;

import com.psycare.dtos.PatientRegisterRequest;
import com.psycare.model.Therapist;
import com.psycare.service.PatientInviteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/patients")
public class PatientController {
    @Autowired
    PatientInviteService inviteService;

    @PostMapping("/invite")
    public ResponseEntity<String> invitePatient(@RequestParam String email) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String therapistEmail = auth.getName();

        Therapist therapist = inviteService.getTherapist(therapistEmail);
        if (therapist == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Therapist not found");
        }

        inviteService.createInvite(therapist, email);
        return ResponseEntity.ok("Invite sent to " + email);
    }


    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody PatientRegisterRequest request) {
        inviteService.registerPatient(request);
        return ResponseEntity.ok("Patient registered successfully");
    }
}

