import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectWorker } from '../shared/models/projectWorker';
import { PresentDay } from '../shared/models/pressentDay';
import { WorkerService } from '../shared/services/worker.service';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { IntlService } from '@progress/kendo-angular-intl';

@Component({
  selector: 'app-worker-project-template',
  templateUrl: './worker-project-template.component.html',
  styleUrls: ['./worker-project-template.component.css']
})

export class WorkerProjectTemplateComponent {
  //----------------PROPERTIRS-------------------
  @Input()
  project: ProjectWorker;
  @Input()
  isClick: boolean;
  stopClick: boolean = false;
  pressantDay: PresentDay = new PresentDay();
  @Output() clickWork: EventEmitter<number> = new EventEmitter<number>();
  //----------------CONSTRUCTOR------------------
  constructor(
    public workerService: WorkerService,
    public userService: UserService,
    public router: Router,
    public intl: IntlService) { }
  //----------------METHODS-------------------
  clickUpdateWork(projectId: number) {
    this.workerService.timerSubject.next(this.stopClick);

    this.stopClick = !this.stopClick;
    this.clickWork.emit(this.project.projectId);

    if (this.stopClick == true) {
      this.startTimer(projectId);
    }

    else this.stopTimer(projectId);

  }

  startTimer(projectId: number) {
    this.pressantDay.timeBegin = new Date();
    this.pressantDay.timeEnd = new Date();
    this.pressantDay.userId = this.userService.currentUser.userId;
    this.pressantDay.projectId = projectId;

    this.workerService.addPresentDay(this.pressantDay).subscribe(res => {
      swal({
        type: 'success',
        title: 'Start',
        showConfirmButton: false,
        timer: 1500
      })
    },
      err => {
        {
          swal({
            type: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
          })
        }
      })
  }

  stopTimer(projectId: number) {
   
    this.pressantDay.timeEnd =new Date( this.intl.formatDate(new Date(), "d")) ;

    this.workerService.updateDayPressent(this.pressantDay)
      .subscribe(res => {
        swal({
          type: 'success',
          title: 'Stop',
          showConfirmButton: false,
          timer: 1500
        });

        this.userService.subjectAllProjects.next("true");

      },
        err => {
          {
            swal({
              type: 'error',
              title: 'Oops...',
              text: 'Something went wrong!',
            })
          }
        })
  }
}
