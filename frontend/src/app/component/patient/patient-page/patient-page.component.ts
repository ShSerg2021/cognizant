import { Component, OnInit } from '@angular/core';
import { PatientService } from '../../../service/patient.service';
import { Patient } from '../../../domain/patient';

@Component({
  selector: 'app-patient-page',
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.scss'],
})
export class PatientPageComponent implements OnInit {
  patients: Patient[];
  loading = false;

  constructor(private patientService: PatientService) {}

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.loading = true;
    this.patientService.findAll().subscribe(
      (data) => {
        this.patients = data;
        this.loading = false;
      },
      () => this.loading = false
    );
  }

  delete(id: string): void {
    this.patientService.delete(id).subscribe(() => {
      this.loadItems();
    });
  }
}
