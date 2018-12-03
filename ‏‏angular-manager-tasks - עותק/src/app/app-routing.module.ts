import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SignInComponent } from "./components/sign-in/sign-in.component";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./shared/auth.guard";
import { WorkerService } from "./shared/services/worker.service";
import { TeamleaderService } from "./shared/services/teamleader.service";



const appRoutes: Routes = [
  {path: "home", component: SignInComponent },
  {path: "", component: SignInComponent },
  //  {path:'manager',component: ManagerComponent,children:[
  //        {path:'addUser',component: AddUserComponent},
  //        {path:'allUsers',component: AllUsersComponent},
  //        {path:'editUser',component: UpdateUserComponent},
  //        {path:'addProject',component: AddProjectComponent},
  //        {path:'addWorkerToProject',component: AddWorkerToProjectComponent},
  //       {path:'userInProject',component: UserInProjectComponent},
     
  //        {path:'allProjects',component: AllProjectsComponent}
  //  ]},
  //  {path:'worker',component: WorkerComponent},
  //  {path:'teamLeader',component: TeamLeaderComponent,children:[
  //     {path:'projectDetails',component: ProjectDetailsComponent},
  //     {path:'graphStatusHoursProjects',component: GraphStatusHoursProjectsComponent},
  //  ]},
  // {path:'teamLeader',component: TeamLeaderComponent,canActivate:[AuthGuard]},


];

const appRouter = RouterModule.forRoot(appRoutes);
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
