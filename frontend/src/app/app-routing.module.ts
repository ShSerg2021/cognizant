import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PatientPageComponent} from "./component/patient-page/patient-page.component";
import {MainComponent} from "./component/main/main.component";

const routes: Routes = [{
  path: '', redirectTo: 'main', pathMatch: 'full'
},
  {
    path: 'main', component: MainComponent
  },
  {
    path: 'patients', component: PatientPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
