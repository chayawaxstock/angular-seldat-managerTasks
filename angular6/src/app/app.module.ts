import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{AppRoutingModule} from './app-routing.module'
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';

import { UserService } from './shared/services/user.service';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { ChartsModule } from 'ng2-charts';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from "@angular/router";




//custom Modules
//import { MDBBootstrapModule } from 'angular-bootstrap-md';
//import { AppRoutingModule } from './app-routing.module';
//import { ChartsModule } from 'ng2-charts';
// import {
  
//   MatMenuModule,
//   MatToolbarModule,
//   MatIconModule,
//   MatCardModule
// } from '@angular/material';



//custom Service

//custom Component
import { AuthGuard } from './shared/auth.guard';


//import {MatButtonModule, MatCheckboxModule,MatCardModule,MatStepHeader} from '@angular/material';
import { HttpModule } from '@angular/http';
//import { NgxLoadingModule } from 'ngx-loading';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkerService } from './shared/services/worker.service';
import { TeamleaderService } from './shared/services/teamleader.service';
import { ManagerService } from './shared/services/manager.service';
import { ManagerComponent } from './manager/manager.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { UserTemplateComponent } from './user-template/user-template.component';
import { ProjectTemplateComponent } from './project-template/project-template.component';
import { AddWorkerToProjectComponent } from './add-worker-to-project/add-worker-to-project.component';
import { UserInProjectComponent } from './user-in-project/user-in-project.component';
import { AddProjectComponent } from './add-project/add-project.component';
import { HourForDepartmentComponent } from './hour-for-department/hour-for-department.component';
import { CreateReportComponent } from './create-report/create-report.component';
import { ExcelService } from './shared/services/excel.service';
import { LogOutComponent } from './log-out/log-out.component';
import { TeamLeaderComponent } from './team-leader/team-leader.component';
import { ProjectTeamLeaderComponent } from './project-team-leader/project-team-leader.component';
import { WorkerComponent } from './worker/worker.component';
import { TimerComponent } from './timer/timer.component';
import { SendEmailComponent } from './send-email/send-email.component';
import { GraphStatusHourComponent } from './graph-status-hour/graph-status-hour.component';
import { ProjectWorkerComponent } from './project-worker/project-worker.component';
import { WorkerToTeamLeaderComponent } from './worker-to-team-leader/worker-to-team-leader.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ChatModule } from '@progress/kendo-angular-conversational-ui';
import { WorkerProjectTemplateComponent } from './worker-project-template/worker-project-template.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { GraphStatusHoursProjectsComponent } from './graph-status-hours-projects/graph-status-hours-projects.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { TasksOfWorkerComponent } from './tasks-of-worker/tasks-of-worker.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectDetailsTemplateComponent } from './project-details-template/project-details-template.component';
import { ProjectWorkerDetailsTemplateComponent } from './project-worker-details-template/project-worker-details-template.component';

import { DepartmentDetailsComponent } from './department-details/department-details.component';
import { WorkerDetailsComponent } from './worker-details/worker-details.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { EditHoursForDepartmentComponent } from './edit-hours-for-department/edit-hours-for-department.component';
import { AddWorkerToProjectTemplateComponent } from './add-worker-to-project-template/add-worker-to-project-template.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { ReportWorkrtsComponent } from './report-workrts/report-workrts.component';
import { ReportWorkerTemplateComponent } from './report-worker-template/report-worker-template.component';
import { WorkersManagementComponent } from './workers-management/workers-management.component';
import { GridEditFormComponent } from './edit-form/edit-form.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { EditService } from './shared/services/edit-service.service';
import { HeaderComponent } from './header/header.component';






@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ManagerComponent,
    AllProjectsComponent,
    UpdateUserComponent,
    UserTemplateComponent,
    ProjectTemplateComponent,
    AddWorkerToProjectComponent,
    UserInProjectComponent,
    AddProjectComponent,
    HourForDepartmentComponent,
    CreateReportComponent,
    LogOutComponent,
    TeamLeaderComponent,
    ProjectTeamLeaderComponent,
    WorkerComponent,
    TimerComponent,
    SendEmailComponent,
    GraphStatusHourComponent,
    ProjectWorkerComponent,
    WorkerToTeamLeaderComponent,
    TasksOfWorkerComponent,
    WorkerProjectTemplateComponent,
    ProjectDetailsComponent,
    ProjectDetailsTemplateComponent,
    ProjectWorkerDetailsTemplateComponent,
    GraphStatusHoursProjectsComponent,
    GridEditFormComponent,
    DepartmentDetailsComponent,
    WorkerDetailsComponent,
    EditProjectComponent,
    EditHoursForDepartmentComponent,
    AddWorkerToProjectTemplateComponent,
    ChangePasswordComponent,
    UserProfilComponent,
    ReportWorkrtsComponent,
    ReportWorkerTemplateComponent,
    WorkersManagementComponent,
    HeaderComponent

  ],
  imports: [

    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
   //ChartsModule,
   AppRoutingModule,
   RouterModule, 
   RouterModule, // Need this module for the routing
   ChartsModule,
   // MDBBootstrapModule.forRoot(),  // Import app routing module,
   // MatButtonModule, MatCheckboxModule,
    BrowserAnimationsModule,
   GridModule,
   InputsModule,
   ExcelExportModule,
   DialogsModule,
   DropDownsModule,
   ButtonsModule,

  

  
  ],
  providers: [UserService,AuthGuard,WorkerService,TeamleaderService,ManagerService,ExcelService,  {
    deps: [HttpClient],
    provide: EditService,
    useFactory: (jsonp: HttpClient) => () => new EditService(jsonp)
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
