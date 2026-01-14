package com.psycare.service;

import com.psycare.dtos.PatientRegisterRequest;
import com.psycare.model.Patient;
import com.psycare.model.PatientInvite;
import com.psycare.model.Role;
import com.psycare.model.Therapist;
import com.psycare.repo.PatientInviteRepository;
import com.psycare.repo.PatientRepository;
import com.psycare.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class PatientInviteService {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    PatientInviteRepository patientInviteRepository;
    @Autowired
    PatientRepository patientRepository;
    @Autowired
    JavaMailSender mailSender;

    private final String appUrl = "https://psycare.com";

    public PatientInvite createInvite(Therapist therapist, String email) {
        PatientInvite invite = new PatientInvite();
        invite.setTherapist(therapist);
        invite.setEmail(email);
        invite = patientInviteRepository.save(invite);
        sendInviteEmail(invite);
        return invite;
    }

    public Therapist getTherapist(String email) {
        return (Therapist) userRepository.findByEmail(email);
    }

    public void sendInviteEmail(PatientInvite invite) {
        String link = appUrl + "/patient/register?token=" + invite.getToken();
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(invite.getEmail());
        message.setSubject("You are invited to PsyCare platform");
        message.setText("Hello,\n\nYou have been invited by your therapist to join PsyCare.\n" +
                "Click the link to register: " + link + "\n\n" +
                "This link is valid for one-time registration.");

        mailSender.send(message);
    }

    public Patient registerPatient(PatientRegisterRequest request) {

        PatientInvite invite = patientInviteRepository.findByToken(request.getToken());

        if (invite == null || invite.isUsed()) {
            throw new RuntimeException("Invalid or already used invite");
        }

        Patient patient = new Patient();
        patient.setEmail(invite.getEmail());
        patient.setPassword(passwordEncoder.encode(request.getPassword()));
        patient.setTherapist(invite.getTherapist());
        patient.setRole(Role.PATIENT);
        patient.setEnabled(true);

        patient.setName(request.getName());
        patient.setSurname(request.getSurname());
        patient.setAge(request.getAge());
        patient.setPhone(request.getPhone());

        invite.setUsed(true);
        patientInviteRepository.save(invite);

        return patientRepository.save(patient);
    }

}
