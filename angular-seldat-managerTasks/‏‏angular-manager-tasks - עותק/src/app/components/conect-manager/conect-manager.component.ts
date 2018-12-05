import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators,FormControl } from '@angular/forms';
import { WorkerService } from 'src/app/shared/services/worker.service';
import { UserService } from 'src/app/shared/services/user.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-conect-manager',
  templateUrl: './conect-manager.component.html',
  styleUrls: ['./conect-manager.component.scss']
})
export class ConectManagerComponent implements OnInit {


   //----------------PROPERTIRS-------------------
   formGroup: FormGroup;
 

  //----------------CONSTRUCTOR------------------

  constructor(public formBuilder: FormBuilder,
    public workerService:WorkerService,
    public userService:UserService) {

    
     }

  ngOnInit() {
    
    let formGroupConfig = {
      subject: new FormControl(""),
      body: new FormControl(""),

    };
    this.formGroup = new FormGroup(formGroupConfig);
  
  }


  //----------------METHODS-------------------
  
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
