import {Injectable} from '@angular/core';
import {BaseService} from './base-service';
import {Patient} from '../domain/patient';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService extends BaseService<Patient> {

  constructor(protected http: HttpClient) {
    super('application-service/patient', http);
  }
}
