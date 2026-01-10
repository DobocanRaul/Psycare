package com.psycare.model;


import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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
    private boolean approved = false;

    @OneToMany(mappedBy = "therapist", cascade = CascadeType.ALL)
    private List<Patient> patients = new ArrayList<>();

}
