package com.psycare.service;

import com.psycare.dtos.TherapistRegistrationRequest;
import com.psycare.model.Role;
import com.psycare.model.Therapist;
import com.psycare.repo.TherapistRepository;
import com.psycare.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TherapistService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TherapistRepository therapistRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Therapist registerTherapist(TherapistRegistrationRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        if (request.getLicenseNumber() == null || request.getLicenseNumber().isEmpty()) {
            throw new RuntimeException("License number is required");
        }

        Therapist therapist = new Therapist();
        therapist.setName(request.getName());
        therapist.setSurname(request.getSurname());
        therapist.setEmail(request.getEmail());
        therapist.setPassword(passwordEncoder.encode(request.getPassword()));
        therapist.setPhone(request.getPhone());
        therapist.setAge(request.getAge());
        therapist.setLicenseNumber(request.getLicenseNumber());

        therapist.setEnabled(false);
        therapist.setRole(Role.THERAPIST);

        return userRepository.save(therapist);
    }

    public List<Therapist> getAllTherapist() {
        return therapistRepository.findAll();
    }

}
