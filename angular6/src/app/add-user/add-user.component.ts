import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../shared/models/user';
import { DepartmentUser } from '../shared/models/departmentUser';
import { UserService } from '../shared/services/user.service';
import { ManagerService } from '../shared/services/manager.service';
import { createValidatorText, createValidatorNumber, DepartmentEnum, validatePassword } from '../shared/validators/user.validation';
import sha256 from  'async-sha256';
import swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent  {

  formGroup: FormGroup;
  obj: typeof Object = Object;
  user: User;
  departments: DepartmentUser[]=[];
  userByDepartment:User[]=[];

  constructor(public userService:UserService,public managerService:ManagerService,public router:Router) {

  userService.getAllDepartments().subscribe(departments=>{ this.departments=departments;
    console.log(this.departments);
  });

  let  emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/; 
  let formGroupConfig = {
    userName: new FormControl("", createValidatorText("userName", 2, 15)),
    password: new FormControl("", createValidatorText("password", 5, 10)),
    confirmPassword:new FormControl("",createValidatorText("confirmPassword",8,15)),
    email:new FormControl("",createValidatorText("email", 5, 30,emailPattern)),
    numHoursWork:new FormControl("", createValidatorNumber("numHoursWork", 4, 9)),
    departmentId: new FormControl("",[Validators.required]),
    managerId:new FormControl()
  };
  this.formGroup = new FormGroup(formGroupConfig,[validatePassword]);
  }

  addUser() {
    if (this.formGroup.invalid) {
      return;
    }
    else {
      this.user = this.formGroup.value;
      console.log(this.user);
      sha256(this.user.password).then(p=>{
        this.user.password=p;
        sha256(this.user.confirmPassword).then(pass=>{
          this.user.confirmPassword=pass;
      this.managerService.addUser(this.user).subscribe(res=>{
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Success!',
          showConfirmButton: false,
          timer: 1500
        })
        this.formGroup.reset();
        this.router.navigate(["/manager/allUsers"]);
      },err=>{swal({
        type: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
       
      })});

      });
      });

    }
  }

  chooseDepartment()
  {
    
   let value=this.formGroup.controls['departmentId'].value;
    if(value==DepartmentEnum.TEAMLEADER)
    {
      this.managerService.getUsersByDepartment("manager").subscribe(users=>{
        console.log(users);
        this.userByDepartment=users;
      });
    }
    else if(value!=DepartmentEnum.MANAGER){
      this.managerService.getUsersByDepartment("teamLeader").subscribe(users=>{
        console.log(users);
        this.userByDepartment=users;
      });
    }
    else {
      this.userByDepartment=[];
    }
  }
}
