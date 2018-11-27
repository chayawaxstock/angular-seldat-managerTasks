import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignInComponent } from "./sign-in/sign-in.component";
import { AppComponent } from "./app.component";
import { ManagerService } from "./shared/services/manager.service";
import { AuthGuard } from "./shared/auth.guard";
import { WorkerService } from "./shared/services/worker.service";
import { TeamleaderService } from "./shared/services/teamleader.service";
import { ManagerComponent } from "./manager/manager.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { AllUsersComponent } from "./all-users/all-users.component";
import { UpdateUserComponent } from "./update-user/update-user.component";
import { AddWorkerToProjectComponent } from "./add-worker-to-project/add-worker-to-project.component";
import { UserInProjectComponent } from "./user-in-project/user-in-project.component";
import { AddProjectComponent } from "./add-project/add-project.component";
import { AllProjectsComponent } from "./all-projects/all-projects.component";
import { WorkerComponent } from "./worker/worker.component";
import { TeamLeaderComponent } from "./team-leader/team-leader.component";
import { ProjectDetailsComponent } from "./project-details/project-details.component";
import { GraphStatusHoursProjectsComponent } from "./graph-status-hours-projects/graph-status-hours-projects.component";
import { CreateReportComponent } from "./create-report/create-report.component";
import { EditProjectComponent } from "./edit-project/edit-project.component";
import { TimePickerComponent } from "@progress/kendo-angular-dateinputs";
import{TimerComponent} from "./timer/timer.component"
import { ChangePasswordComponent } from "./change-password/change-password.component";




const appRoutes: Routes = [
     {path: "home", component: SignInComponent },
     {path: "", component: SignInComponent },
    {path: "changePassword/:requestId", component: ChangePasswordComponent },
    {path: "changePassword", component: ChangePasswordComponent },
     {path:'manager',component: ManagerComponent,children:[
           {path:'addUser',component: AddUserComponent},
           {path:'allUsers',component: AllUsersComponent},
           {path:'editUser',component: UpdateUserComponent},
           {path:'addProject',component: AddProjectComponent},
           {path:'addWorkerToProject',component: AddWorkerToProjectComponent},
          {path:'userInProject',component: UserInProjectComponent},
       
           {path:'allProjects',component: AllProjectsComponent},
           {path:'reports',component: CreateReportComponent},
           {path:'editProject',component: EditProjectComponent},
     ]},
     {path:'worker',component: WorkerComponent},
     {path:'teamLeader',component: TeamLeaderComponent,children:[
        {path:'projectDetails',component: ProjectDetailsComponent},
        {path:'graphStatusHoursProjects',component: GraphStatusHoursProjectsComponent},
     ]},
    // {path:'teamLeader',component: TeamLeaderComponent,canActivate:[AuthGuard]},
  

];

const appRouter = RouterModule.forRoot(appRoutes);

@NgModule({
    imports: [appRouter]
})
export class AppRoutingModule { }