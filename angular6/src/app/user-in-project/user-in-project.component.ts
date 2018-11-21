import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/models/project';
import { User } from '../shared/models/user';
import { ManagerService } from '../shared/services/manager.service';

@Component({
  selector: 'app-user-in-project',
  templateUrl: './user-in-project.component.html',
  styleUrls: ['./user-in-project.component.css']
})
export class UserInProjectComponent implements OnInit {

  project: Project;
  workers:User[];

  constructor(public managerService:ManagerService) { }

  ngOnInit() {
  debugger;
      this.project=this.managerService.project;
      this.managerService.getWorkerInProject(this.project.projectId).subscribe(res=>{
        this.workers=res;
      })
  }

  //delete button remove
}
