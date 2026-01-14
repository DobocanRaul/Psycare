package com.psycare.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.util.UUID;

@Entity
@Data

public class PatientInvite {
    @Id
    @GeneratedValue
    private Long id;

    private String email;

    private String token = UUID.randomUUID().toString();

    @ManyToOne
    private Therapist therapist;

    private boolean used = false;
}

