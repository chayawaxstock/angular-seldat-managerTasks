import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../shared/models/project';
import { ManagerService } from '../shared/services/manager.service';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  projects: Project[]=[];
  @Input() loginInfo:User;
  constructor(public managerService:ManagerService,public router:Router) { }

  ngOnInit() {

  }
  activeRoute(routename: string): boolean{
    return this.router.url.indexOf(routename) > -1;
  }

}
