package com.psycare.service;

import com.psycare.repo.TherapistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TherapistService {

    @Autowired
    private TherapistRepository therapistRepository;
}
