import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { PatientPageComponent } from './component/patient/patient-page/patient-page.component';
import { MainComponent } from './component/main/main.component';
import { PatientEditComponent } from './component/patient/patient-edit/patient-edit.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { PatientTemplateComponent } from './component/patient/patient-page/patient-template/patient-template.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [AppComponent, PatientPageComponent, MainComponent, PatientEditComponent, PatientTemplateComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    AuthModule.forRoot({
      domain: 'dev-uy1xbyu5.us.auth0.com',
      clientId: 'yrH6DyekaRmsuVKoDsVmaep5XR2pv2Dc',
      audience: 'https://dev-uy1xbyu5.us.auth0.com/api/v2/',
      httpInterceptor: {
        allowedList: ['*'],
      },
    }),
    MatProgressBarModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
