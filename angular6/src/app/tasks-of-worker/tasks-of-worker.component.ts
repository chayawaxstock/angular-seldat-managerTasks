import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { WorkerService } from '../shared/services/worker.service';
import { ProjectWorkerComponent } from '../project-worker/project-worker.component';
import { ProjectWorker } from "../shared/models/projectWorker";

@Component({
  selector: 'app-tasks-of-worker',
  templateUrl: './tasks-of-worker.component.html',
  styleUrls: ['./tasks-of-worker.component.css']
})
export class TasksOfWorkerComponent implements OnInit {
   isClick:boolean=false;
  isTimerStart:boolean=false;
  constructor(public workerService:WorkerService,public userService:UserService) { }
projects:ProjectWorker[]=[];
  ngOnInit() 
  {
    this.getAllProjects();
    this.userService.subjectAllProjects.subscribe(v=>{
      this.getAllProjects();
       })
   
  }

  getAllProjects()
  {
    this.workerService.getTasksOfWorker(this.userService.currentUser.userId).subscribe(res=>{
      console.log(res);
      this.projects=res;
    });;
  }

  clickWork(id:number)
  {
    this.isClick=!this.isClick;
  }
  timer(isStart:boolean)
  {
   this.isTimerStart=!this.isTimerStart;
  }


}
