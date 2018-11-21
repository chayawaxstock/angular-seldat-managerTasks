
import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../shared/services/worker.service';
import { UserService } from '../shared/services/user.service';
import { TeamleaderService } from '../shared/services/teamleader.service';
import { Project } from '../shared/models/project';
@Component({
  selector: 'app-graph-status-hours-projects',
  templateUrl: './graph-status-hours-projects.component.html',
  styleUrls: ['./graph-status-hours-projects.component.css']
})





export class GraphStatusHoursProjectsComponent implements OnInit {

  barChartOptions: any;
  barChartLabels: any[]=[];
  barChartType: any;
  barChartLegend: any;
  barChartData: any;

  constructor(public workerService:WorkerService,public userService:UserService,public teamLeaderService:TeamleaderService) { }
  projects:Project[]=[];
  ngOnInit() {

     this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };

    this.teamLeaderService.getHourWorkerTeamLeader(this.userService.currentUser.userId).subscribe(res=>{
      Object.entries(res).forEach(
        ([key, value]) => console.log(key, value)
      );
      debugger;
      this.projects=res; 
      res.forEach(x=>{   this.barChartLabels.push( x.projectName); })
    });
    //  this.barChartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
     this.barChartType = 'bar';
     this.barChartLegend = true;
   
     this.barChartData = [
      {data: [65, 59, 80, 81, 56, 55, 40], label: 'name project'},
      {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
    ];

    this.workerService.getHoursForUserProjects(this.userService.currentUser.userId).subscribe(
      res=>{
        
      }
    )
  }

  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
 
  public chartHovered(e:any):void {
    console.log(e);
  }

}


