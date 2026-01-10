package com.psycare.service;

import com.psycare.model.Role;
import com.psycare.model.Therapist;
import com.psycare.model.User;
import com.psycare.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Therapist approveTherapistByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null || !(user instanceof Therapist)) {
            throw new RuntimeException("Therapist not found");
        }
        Therapist therapist = (Therapist) user;
        if (therapist.isEnabled()) {
            throw new RuntimeException("Therapist already approved");
        }
        therapist.setEnabled(true);
        therapist.setApproved(true);

        return userRepository.save(therapist);
    }
}
