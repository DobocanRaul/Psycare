package com.psycare.controller;

import com.psycare.dtos.TherapistRegistrationRequest;
import com.psycare.model.Therapist;
import com.psycare.service.TherapistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/therapist")
public class TherapistController {
    @Autowired
    private TherapistService therapistService;

    @PostMapping("/register")
    public Therapist register(@RequestBody TherapistRegistrationRequest request) {
        return therapistService.registerTherapist(request);
    }
}
