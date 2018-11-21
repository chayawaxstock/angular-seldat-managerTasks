import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{AppRoutingModule} from './app-routing.module'
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';

import { UserService } from './shared/services/user.service';

import { ChartsModule } from 'ng2-charts';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
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


//import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { HttpModule } from '@angular/http';
//import { NgxLoadingModule } from 'ngx-loading';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkerService } from './shared/services/worker.service';
import { TeamleaderService } from './shared/services/teamleader.service';
import { ManagerService } from './shared/services/manager.service';
import { ManagerComponent } from './manager/manager.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { AllUsersComponent } from './all-users/all-users.component';
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
import { ClockAnalistyComponent } from './clock-analisty/clock-analisty.component';
import { WorkerToTeamLeaderComponent } from './worker-to-team-leader/worker-to-team-leader.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { ChatModule } from '@progress/kendo-angular-conversational-ui';
import { WorkerProjectTemplateComponent } from './worker-project-template/worker-project-template.component';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { DialogsModule } from '@progress/kendo-angular-dialog';
import { ExcelExportModule } from '@progress/kendo-angular-excel-export';
import { GraphStatusHoursProjectsComponent } from './graph-status-hours-projects/graph-status-hours-projects.component';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { TasksOfWorkerComponent } from './tasks-of-worker/tasks-of-worker.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectDetailsTemplateComponent } from './project-details-template/project-details-template.component';
import { ProjectWorkerDetailsTemplateComponent } from './project-worker-details-template/project-worker-details-template.component';






@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    ManagerComponent,
    AllProjectsComponent,
    AddUserComponent,
    UpdateUserComponent,
    DeleteUserComponent,
    AllUsersComponent,
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
    ClockAnalistyComponent,
    WorkerToTeamLeaderComponent,
    TasksOfWorkerComponent,
    WorkerProjectTemplateComponent,
    ProjectDetailsComponent,
    ProjectDetailsTemplateComponent,
    ProjectWorkerDetailsTemplateComponent,
    GraphStatusHoursProjectsComponent,
  
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
// MatButtonModule,
//      MatCheckboxModule,
   // NgxLoadingModule.forRoot({})
   // MatMenuModule,
   // MatToolbarModule,
  //  MatIconModule,
   // MatCardModule
  
  ],
  providers: [UserService,AuthGuard,WorkerService,TeamleaderService,ManagerService,ExcelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
