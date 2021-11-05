import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Patient } from '../../../../domain/patient';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-template',
  templateUrl: './patient-template.component.html',
  styleUrls: ['./patient-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientTemplateComponent {
  @Input() patients: Patient[];
  @Output() delete = new EventEmitter<string>();

  constructor(public router: Router) {}
}
