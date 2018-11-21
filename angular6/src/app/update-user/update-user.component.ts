import { Component, OnInit } from '@angular/core';
import { DepartmentUser } from '../shared/models/departmentUser';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { createValidatorText, createValidatorNumber } from '../shared/validators/user.validation';
import { ManagerService } from '../shared/services/manager.service';
import swal from 'sweetalert2'

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  departments: DepartmentUser[]=[];
  formGroup: FormGroup;
  user: User;
  obj: typeof Object = Object;
errorList:string[];

  constructor(public userService: UserService,public managerService:ManagerService,public router:Router) {

    userService.getAllDepartments().subscribe(departments=>{
       this.departments=departments;
      console.log(this.departments);
    });

    this.user=this.managerService.userToEdit;

    let  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/; 
    
    let formGroupConfig = {

      userName: new FormControl(this.user.userName, createValidatorText("userName", 2, 15)),
      email:new FormControl(this.user.email,createValidatorText("email", 8, 30,emailPattern)),
      numHoursWork:new FormControl(this.user.numHoursWork, createValidatorNumber("numHoursWork", 4, 9)),
    };
    this.formGroup = new FormGroup(formGroupConfig);

    
   }

  ngOnInit() {
  
  }

  saveChangeUser()
  {
   // this.user.userName  =this.formGroup.value["userName"];
   /// this.user.email=this.formGroup.value["email"];
   // this.user.numHoursWork=this.formGroup.value["numHoursWork"];
    this.user.email=this.formGroup.value.email;
    this.user.userName=this.formGroup.value.userName;
    this.user.numHoursWork=this.formGroup.value.numHoursWork;
   this.user.userId=this.managerService.userToEdit.userId;
    this.managerService.updateUser(this.user).subscribe(res=>{
      swal({
        position: 'top-end',
        type: 'success',
        title: 'Success',
        showConfirmButton: false,
        timer: 1500
      })
     this.router.navigate(["/manager/allUsers"]);
    // },err=>{
    //   this.errorList=[];
    //   if(err.error)
    //   err.error.forEach(element => {
    //     this.errorList.push(element+" ");
    //   });
    },err=>{swal({
      type: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
     
    })})
  }

}
