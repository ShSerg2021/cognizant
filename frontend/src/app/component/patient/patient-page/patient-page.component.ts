import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {PatientService} from '../../../service/patient.service';
import {Observable} from 'rxjs';
import {Patient} from '../../../domain/patient';
import {Router} from '@angular/router';

@Component({
  selector: 'app-patient-page',
  templateUrl: './patient-page.component.html',
  styleUrls: ['./patient-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientPageComponent implements OnInit {

  patients: Observable<Patient[]>;

  constructor(private patientService: PatientService, private ref: ChangeDetectorRef, public router: Router) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.patients = this.patientService.findAll();
  }

  delete(id: string): void {
    this.patientService.delete(id).subscribe(() => {
      this.loadItems();
      this.ref.markForCheck();
    });
  }

}
