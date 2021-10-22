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
import { MatMenuModule } from '@angular/material/menu';
import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [AppComponent, PatientPageComponent, MainComponent, PatientEditComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    MatMenuModule,
    AuthModule.forRoot({
      domain: 'dev-uy1xbyu5.us.auth0.com',
      clientId: 'yrH6DyekaRmsuVKoDsVmaep5XR2pv2Dc',
      httpInterceptor: {
        allowedList: ['*'],
      },
    }),
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
