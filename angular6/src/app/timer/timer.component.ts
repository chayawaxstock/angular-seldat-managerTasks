import { Component, OnInit, Input } from '@angular/core';
import { PresentDay } from '../shared/models/pressentDay';
import { Subscription } from 'rxjs';
import { WorkerService } from '../shared/services/worker.service';
import { UserService } from '../shared/services/user.service';
import { Project } from '../shared/models/project';

@Component({
    selector: 'app-timer',
    templateUrl: './timer.component.html',
    styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

    ticks = 0;
    @Input()
    isPlay:boolean;
    minutesDisplay: number = 0;
    hoursDisplay: number = 0;
    secondsDisplay: number = 0;
    pressantDay: PresentDay = new PresentDay();
    sub: Subscription;
    timer: any;
    isSelectProject: boolean = false;
    projectsWorker: Project[];
    projectId: number;
    constructor(public workerService: WorkerService, public userService: UserService) {

    }
    ngOnInit() {
      this.workerService.timerSubject.subscribe((status)=>{
    if(status==false)
        this.startTimer();
     else this.stopTimer();
      })
      
       
    }
    // selectProject(event) {
    //     this.isSelectProject = true;
    //     if(event==0)
    //     this.projectId =   this.projectsWorker[event].projectId;
    //     else
    //     this.projectId =   this.projectsWorker[event.target["options"].selectedIndex].projectId;
    // }


    startTimer() {

        this.timer = setInterval(() => this.getTimer(), 1000);
    }

    getTimer(): any {
        this.ticks++;
        this.secondsDisplay = this.getSeconds(this.ticks);
        this.minutesDisplay = this.getMinutes(this.ticks);
        this.hoursDisplay = this.getHours(this.ticks);
    }


    stopTimer() {
      

        clearInterval(this.timer);
            this.ticks = -1;
            this.getTimer();
       
    }


    private getSeconds(ticks: number) {
        return this.pad(ticks % 60);
    }

    private getMinutes(ticks: number) {
        return this.pad((Math.floor(ticks / 60)) % 60);
    }

    private getHours(ticks: number) {
        return this.pad(Math.floor((ticks / 60) / 60));
    }

    private pad(digit: any) {
        return digit <= 9 ? '0' + digit : digit;
    }

}
