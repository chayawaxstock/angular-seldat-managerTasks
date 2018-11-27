import { Component, OnInit } from '@angular/core';
import { SendEmail } from '../shared/models/sendEmail';
import { WorkerService } from '../shared/services/worker.service';
import { UserService } from '../shared/services/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  isSend:boolean=false;
  message:SendEmail=new SendEmail();
  constructor(public workerService:WorkerService,public userService:UserService) { }

  ngOnInit() {
  }

  enableSend()
  {
    this.isSend=true;
  }

  sendEmail()
  {
  
    this.workerService.sendEmail(this.message,this.userService.currentUser.userId).subscribe(
      res=>{
        swal({
          position: 'top-end',
          type: 'success',
          title: 'The messge has been sent',
          showConfirmButton: false,
          timer: 1500
        })
      }
    );
  }

}
