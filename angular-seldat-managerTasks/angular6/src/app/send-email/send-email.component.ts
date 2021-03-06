import { Component, OnInit } from '@angular/core';
import { WorkerService } from '../shared/services/worker.service';
import { UserService } from '../shared/services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  
   //----------------PROPERTIRS-------------------
   formGroup: FormGroup;

  //----------------CONSTRUCTOR------------------

  constructor(
    public workerService:WorkerService,
    public userService:UserService,
    public router:Router) {}

  //----------------METHODS-------------------
  ngOnInit() {
    let formGroupConfig = {
      subject: new FormControl(""),
      body: new FormControl(""),

    };
    this.formGroup = new FormGroup(formGroupConfig);
  }

  sendEmail()
  {
    this.workerService.sendEmail(this.formGroup.value,this.userService.currentUser.userId).subscribe(
      res=>{
        swal({
          position: 'top-end',
          type: 'success',
          title: 'The message has been sent',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(["/worker"]);

      },err=>{
        swal({
          type: 'error',
          title: 'Oops...',
          text: 'send email failed',
        })
      }
    );
  }

}
