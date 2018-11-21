import { Component, OnInit,Input } from '@angular/core';
import { Project } from '../shared/models/project';
import { TeamleaderService } from '../shared/services/teamleader.service';
import { ProjectWorker } from '../shared/models/projectWorker';

@Component({
  selector: 'app-project-details-template',
  templateUrl: './project-details-template.component.html',
  styleUrls: ['./project-details-template.component.css']
})
export class ProjectDetailsTemplateComponent implements OnInit {

  @Input()
  project: Project;
  workersForProject:ProjectWorker[];
  constructor(public teamleaderService:TeamleaderService) { }
  isAllDetails: boolean = false;
  toggle: boolean = false;
  ngOnInit() {
console.log(this.project);
  }
  showMoreDetails(event){

   
    if (this.toggle == false) {
      this.teamleaderService.getUserBelongProject(event).subscribe(res=>{
        this.workersForProject=res;

      console.log(  this.workersForProject[0]);


      this.toggle = true
    });
  }
    else {
    
      this.toggle = false;


    }

   

  }}
