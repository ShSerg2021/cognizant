package com.cognizant.service;

import com.cognizant.domain.Patient;
import org.springframework.stereotype.Service;

@Service
public class PatientServiceImpl extends DefaultCrudService<Patient> implements PatientService {
}
