import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/models/project';
import { ProjectWorker } from '../shared/models/projectWorker';
import { TeamleaderService } from '../shared/services/teamleader.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {


  projects:Project[];
  constructor(public teamLeaderService:TeamleaderService,public userService:UserService) { }

  ngOnInit() {
  this.teamLeaderService.getProjectTeamLeader(this.userService.currentUser.userId).subscribe(res=>{
  this.projects=res;
  console.log(this.projects[0]);
   });
  }

}
