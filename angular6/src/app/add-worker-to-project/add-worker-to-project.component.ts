import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/models/project';
import { User } from '../shared/models/user';
import { ManagerService } from '../shared/services/manager.service';

@Component({
  selector: 'app-add-worker-to-project',
  templateUrl: './add-worker-to-project.component.html',
  styleUrls: ['./add-worker-to-project.component.css']
})
export class AddWorkerToProjectComponent implements OnInit {

  project:Project;

  workesNotinProject:User[]=[];
  addWorker:User[]=[];

  constructor(public managerService:ManagerService) {
 
   }

  ngOnInit(){
      this.project=this.managerService.workerToProject; 
       this.managerService.getWorkerNotInProject(this.project.projectId).subscribe(res=>{
          console.log(res);
          this.workesNotinProject=res;
        })    
  }


  changeWorker(worker:User)
  {
      let indexWorker=this.addWorker.indexOf(worker);
     if(indexWorker==-1) 
       {
       this.addWorker.push(worker);
       }
     else this.addWorker.splice(indexWorker,1);
  }

  saveChange()
  {
    this.managerService.addWorkersToProject(this.project.projectId,this.addWorker).subscribe(res=>{
        alert("seccsess");
    },err=>{

    });
  }

}
