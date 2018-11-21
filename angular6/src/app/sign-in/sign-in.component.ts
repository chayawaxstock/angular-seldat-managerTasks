import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { createValidatorText } from '../shared/validators/user.validation';
import { User } from '../shared/models/user';
//import { Md5 } from 'ts-md5/dist/md5';
import { LoginUser } from '../shared/models/loginUser';
import { DepartmentEnum } from '../shared/validators/user.validation'
//import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import sha256 from 'async-sha256' ;



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  
 
  ngOnInit(): void {
    
    if(localStorage.getItem("user")!=null)
    {
      let user:User=JSON.parse(localStorage.getItem("user"));
    //   this.userService.signInUser(user).subscribe(data => {
    //     this.userService.currentUser = data;
    //       this.checkDepartment();
    //     }, err => {
    //     });
    // }

    this.userService.currentUser = user;
          this.checkDepartment();
    }
  }
 
  //-----------------properties-------------------
  formGroup: FormGroup;
  obj: typeof Object = Object;
  hostname: any;
  domain: any;

  //-----------------constructor-------------------
  constructor(private userService: UserService, private router: Router) {
    let formGroupConfig = {
      userName: new FormControl("", createValidatorText("userName", 2, 15)),
      password: new FormControl("", createValidatorText("password", 8, 20)),
      remember:new FormControl(false)
     
    };
    this.formGroup = new FormGroup(formGroupConfig);
   
  }
  //-----------------functions-------------------

  submitRegister() {

    if (this.formGroup.invalid) {
      return;
    }
  
    let user: LoginUser = this.formGroup.value;
    let pass=user.password;

    sha256(user.password).then( p=>{user.password=p;
    console.log(user.password);
    let ip="";
    if(this.formGroup.controls["remember"].value==true)
    {
      this.userService.getIp().subscribe( res=>{
         user.ip=res.ip;
         this.signIn(user,pass);
      });
    }
    else this.signIn(user,pass);
    });
  }

  signIn(user:LoginUser,lastPassword): any {

    this.userService.signInUser(user).subscribe(data => {
      this.userService.currentUser = data;
      localStorage.setItem("user",JSON.stringify(data));
        this.checkDepartment();
    
      },
       err => {
        user.password=lastPassword;
        console.log(err.message);
        alert("invalid");
      
      });
  }


  checkDepartment() {
    if (this.userService.currentUser.departmentId == DepartmentEnum.TEAMLEADER)
    this.router.navigate(['/teamLeader']);
    else if (this.userService.currentUser.departmentId == DepartmentEnum.MANAGER)
    this.router.navigate(['/manager']);
    else   this.router.navigate(['/worker']);
  }

  //TODO:על ידי שם מחשב
  
}
