import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientPageComponent } from './component/patient/patient-page/patient-page.component';
import { MainComponent } from './component/main/main.component';
import { PatientEditComponent } from './component/patient/patient-edit/patient-edit.component';
import { AdminGuard } from './guard/admin.guard';
import { AppGuard } from './guard/app.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    component: MainComponent,
  },
  {
    path: 'patients',
    component: PatientPageComponent,
    canActivate: [AppGuard],
  },
  {
    path: 'patient',
    component: PatientEditComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'patient/:id',
    component: PatientEditComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
