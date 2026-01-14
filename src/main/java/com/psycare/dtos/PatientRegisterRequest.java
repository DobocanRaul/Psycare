package com.psycare.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PatientRegisterRequest {
    private String token;
    private String password;
    private String name;
    private String surname;
    private Integer age;
    private String phone;
}
