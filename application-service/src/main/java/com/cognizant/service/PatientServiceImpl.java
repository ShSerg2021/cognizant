package com.cognizant.service;

import com.cognizant.domain.Patient;
import com.cognizant.repository.PatientRepository;
import org.springframework.stereotype.Service;

@Service
public class PatientServiceImpl extends DefaultCrudService<Patient, PatientRepository> implements PatientService {
}
