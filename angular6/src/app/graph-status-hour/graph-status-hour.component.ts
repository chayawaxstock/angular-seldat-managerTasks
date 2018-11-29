import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../shared/services/worker.service';
import { UserService } from '../shared/services/user.service';
import { Graph } from '../shared/models/graph';
import { Project } from '../shared/models/project';
import { ProjectWorker } from '../shared/models/projectWorker';

@Component({
  selector: 'app-graph-status-hour',
  templateUrl: './graph-status-hour.component.html',
  styleUrls: ['./graph-status-hour.component.css']
})
export class GraphStatusHourComponent implements OnInit {

  barChartOptions: any;
  barChartLabels: any[]=[];
  barChartType: any;
  barChartLegend: any;
  barChartData: any[]=[];

  constructor(public workerService: WorkerService, public userService: UserService) { }
projects:ProjectWorker[]=[];
  ngOnInit() {
    this.barChartData = [
      {data: [], label: 'hours done'},
      {data: [], label: 'Hours required'}
     ];

    this.barChartOptions = {
      scaleShowVerticalLines: false,
      responsive: true
    };

    this.userService.getHoursForProjectsByUser(this.userService.currentUser.userId).subscribe(res => {
     
       debugger;


      this.workerService.getTasksOfWorker(this.userService.currentUser.userId).subscribe(res=>{
        console.log(res);
        this.projects=res;
        res.forEach((x)=>{console.log(x); this.barChartLabels.push(x.project.projectName) ; this.barChartData[0].data.push(x.sumHoursDone); 
       this.barChartData[1].data.push(x.hoursForProject);
      });
      });;

  

    
    })
     
      this.barChartType = 'bar';
      this.barChartLegend = true;

  }
  // events
  public chartClicked(e: any): void {
        console.log(e);
      }
 
  public chartHovered(e: any): void {
        console.log(e);
      }

    }
