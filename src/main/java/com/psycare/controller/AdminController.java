package com.psycare.controller;

import com.psycare.model.Therapist;
import com.psycare.service.TherapistService;
import com.psycare.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    private UserService userService;
    @Autowired
    TherapistService therapistService;


    @PreAuthorize("hasRole('ADMIN')")
    @PatchMapping("/approve/{email}")
    public Therapist approveTherapist(@PathVariable String email) {
        return userService.approveTherapistByEmail(email);
    }

    @GetMapping("/therapists/pending")
    public List<Therapist> getPendingTherapists() {
        return therapistService.getAllTherapist().stream().filter(t-> !t.isApproved()).toList();
    }
}
