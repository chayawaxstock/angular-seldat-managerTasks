import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/models/project';
import { WorkerService } from '../shared/services/worker.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-project-worker',
  templateUrl: './project-worker.component.html',
  styleUrls: ['./project-worker.component.css']
})
export class ProjectWorkerComponent implements OnInit {

  projectsWorker:Project[];

  constructor(public workerService:WorkerService,public userService:UserService) { }

  ngOnInit() {
    this.workerService.getProjectsUser(this.userService.currentUser.userId).subscribe(res=>{
       this.projectsWorker=res;
    })
  }
}
