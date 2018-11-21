import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/models/project';
import { ManagerService } from '../shared/services/manager.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  projects: Project[]=[];

  constructor(public managerService:ManagerService) { }

  ngOnInit() {
  

  }

 

}
