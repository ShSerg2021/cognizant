package com.cognizant.web;

import com.cognizant.config.web.BaseController;
import com.cognizant.domain.Patient;
import com.cognizant.service.PatientService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("patient")
public class PatientController extends BaseController<Patient, PatientService> {
}
