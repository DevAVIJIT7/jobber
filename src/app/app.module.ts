import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { DatepickerModule } from 'angular2-material-datepicker';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import {
  Company,
  CompaniesService,
  CompanyListComponent,
  NewCompanyComponent,
} from './companies';

import {
  Job,
  JobsService,
  JobListComponent,
  NewJobComponent,
} from './jobs';

import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'companies', component: CompanyListComponent},
  {path: 'companies/new', component: NewCompanyComponent},
  {path: 'jobs', component: JobListComponent},
  {path: 'jobs/new', component: NewJobComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CompanyListComponent,
    NewCompanyComponent,
    JobListComponent,
    NewJobComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAGitfNejBSJv7WOs1-Ok0M2VhZ_LgGb_s",
      libraries: ["places"]
    }),
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    DatepickerModule,
    RouterModule.forRoot(routes)
  ],
  providers: [CompaniesService, JobsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
