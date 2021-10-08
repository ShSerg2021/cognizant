import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PatientService} from '../../../service/patient.service';
import {Patient} from '../../../domain/patient';

@Component({
  selector: 'app-patient-edit',
  templateUrl: './patient-edit.component.html',
  styleUrls: ['./patient-edit.component.scss']
})
export class PatientEditComponent implements OnInit {

  readonly id: string;
  patient: Patient;

  constructor(route: ActivatedRoute, private patientService: PatientService) {
    this.id = route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.patientService.findById(this.id).subscribe((data) => this.patient = data);
  }

}
