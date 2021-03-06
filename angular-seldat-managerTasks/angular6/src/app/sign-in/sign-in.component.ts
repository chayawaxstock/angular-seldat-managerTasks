import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { createValidatorText } from '../shared/validators/user.validation';
import { LoginUser } from '../shared/models/loginUser';
import sha256 from 'async-sha256';
import swal from 'sweetalert2';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  //-----------------properties-------------------
  formGroup: FormGroup;
  obj: typeof Object = Object;
  hostname: any;
  domain: any;
  ip: string;
  user: User

  //-----------------constructor-------------------
  constructor(
    private userService: UserService,
    private router: Router) {

      //check if do logout or enter firstTime
    if(this.userService.isFirst)
    {
       this.signInWithIp();
      this.userService.isFirst=false;
    }

    let formGroupConfig = {
      userName: new FormControl("", createValidatorText("userName", 2, 15)),
      password: new FormControl("", createValidatorText("password", 8, 20)),
      remember: new FormControl(false)

    };
    this.formGroup = new FormGroup(formGroupConfig);
  }
  //----------------METHODS-------------------
  signInWithIp()
  {
    this.userService.getIp()
      .subscribe(res => {
         this.ip = res.ip;
         this.userService.loginByUserComputer(this.ip)
           .subscribe(x => {
         this.user = x;
        //save user in global prop
           this.userService.currentUser = x;

        //check promissing
        this.userService.checkDepartment();
      }, err => {
        //TODO:להדפיס את השגיאה
        //faild login
        this.router.navigate(['/home']);
      });
    });

  }

  submitRegister() {

    if (this.formGroup.invalid) {
      return;
    }

    let user: LoginUser = this.formGroup.value;
    let pass = user.password;

    //convert password to sha256
    sha256(user.password).then(p => {
      user.password = p;
      console.log(user.password);

      let ip = "";
      if (this.formGroup.controls["remember"].value == true) {
        //checked remember me save ip
        this.userService.getIp().subscribe(res => {
          user.ip = res.ip;
          this.signIn(user, pass);
        });
      }

      else this.signIn(user, pass);
    });
  }

  signIn(user: LoginUser, lastPassword): any {

    this.userService.signInUser(user).subscribe(data => {
      this.userService.currentUser = data;

      //check premmesion
      this.userService.checkDepartment();

    },
      err => {
        user.password = lastPassword;
        //TODO:להדפיס שגיאות
        alert("invalid");

      });
  }

  forgetPassword() {
    this.userService.forgetPassword(this.formGroup.controls['userName'].value)
      .subscribe(res => {
      swal({
        type: 'success',
        title: 'We send you a email to change your password',
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

    });

  }




  //TODO:על ידי שם מחשב

}
