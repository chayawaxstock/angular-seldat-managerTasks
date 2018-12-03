import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../shared/models/project';
import { TeamleaderService } from '../shared/services/teamleader.service';
import { ProjectWorker } from '../shared/models/projectWorker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-details-template',
  templateUrl: './project-details-template.component.html',
  styleUrls: ['./project-details-template.component.css']
})
export class ProjectDetailsTemplateComponent implements OnInit {

  @Input()
  project: Project;
  workersForProject: ProjectWorker[];
  constructor(public teamleaderService: TeamleaderService, public router: Router) { }
  isAllDetails: boolean = false;
  toggle: boolean = false;
  ngOnInit() {
    console.log(this.project);
  }
  showMoreDetails(event) {


    if (this.toggle == false) {
      this.teamleaderService.getUserBelongProject(event).subscribe(res => {
        this.workersForProject = res;

        console.log(this.workersForProject[0].project.numHourForProject);


        this.toggle = true
      });
    }
    else {

      this.toggle = false;


    }



  }

  showGraphHours(project: Project) {
    this.teamleaderService.projectGraph = project;
    this.router.navigate(['/teamLeader/graphStatusHoursProjects']);
  }
}
