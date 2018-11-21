import { Component, OnInit, Input,Output, EventEmitter } from '@angular/core';
import { Project } from '../shared/models/project';
import { ManagerService } from '../shared/services/manager.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-project-template',
  templateUrl: './project-template.component.html',
  styleUrls: ['./project-template.component.css']
})
export class ProjectTemplateComponent implements OnInit {

  @Input()
  project: Project;
  projects: Project[] = [];
  @Output() deleteProject: EventEmitter<number> = new EventEmitter<number>();
  constructor(public managerService:ManagerService,public router:Router) { }

  ngOnInit() {
    console.log(
this.project.hoursForDepartment[0].sumHours,

this.project.hoursForDepartment[0].departmentUser.department
)
  }

  addWorkerToProject()
  {
 
     this.managerService.workerToProject=this.project;
     this.router.navigate(["/manager/addWorkerToProject"])
  }

  showWorker()
  {
    this.managerService.project=this.project;
    this.router.navigate(["/manager/userInProject"])
  }

 
  delete()
  {
    console.log(this.project.projectId)
    this.deleteProject.emit(this.project.projectId);
  }
}


