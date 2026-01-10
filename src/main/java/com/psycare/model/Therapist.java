package com.psycare.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "therapists")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Therapist extends User {

    @Column(unique = true, nullable = false)
    private String licenseNumber;

    @OneToMany(mappedBy = "therapist", cascade = CascadeType.ALL)
    private List<Patient> patients = new ArrayList<>();

    private boolean approved;

}
