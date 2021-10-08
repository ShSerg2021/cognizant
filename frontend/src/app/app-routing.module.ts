import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PatientPageComponent} from './component/patient/patient-page/patient-page.component';
import {MainComponent} from './component/main/main.component';
import {PatientEditComponent} from './component/patient/patient-edit/patient-edit.component';

const routes: Routes = [{
  path: '', redirectTo: 'main', pathMatch: 'full'
},
  {
    path: 'main', component: MainComponent
  },
  {
    path: 'patients', component: PatientPageComponent
  },
  {
    path: 'patient', component: PatientEditComponent
  },
  {
    path: 'patient/:id', component: PatientEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
