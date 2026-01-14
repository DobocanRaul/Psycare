package com.psycare.repo;

import com.psycare.model.PatientInvite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PatientInviteRepository extends JpaRepository<PatientInvite, Integer> {
    PatientInvite findByToken(String token);
}
