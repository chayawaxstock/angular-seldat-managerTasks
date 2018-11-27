import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { createValidatorText } from '../shared/validators/user.validation';
import { LoginUser } from '../shared/models/loginUser';
import sha256 from 'async-sha256' ;
@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{
 
  formGroup: FormGroup;
  obj: typeof Object = Object;
  hostname: any;
  domain: any;
  requestId:number;
  //-----------------constructor-------------------
  constructor(private userService: UserService, private router: Router,private route: ActivatedRoute) {
    let formGroupConfig = {
      userName: new FormControl("", createValidatorText("userName", 2, 15)),
      password: new FormControl("", createValidatorText("password", 8, 20)),
     
    };
    this.formGroup = new FormGroup(formGroupConfig);

   
  }
  ngOnInit() {
    debugger;
    this.requestId =parseInt(this.route.snapshot.paramMap.get('requestId'));
  }

  //-----------------functions-------------------

  submitPassword() {

    if (this.formGroup.invalid) {
      return;
    }
  
    let user: LoginUser = this.formGroup.value;
    let pass=user.password;

    //convert password to sha256
    sha256(user.password).then( p=>{
    user.password=p;
    console.log(user.password);
    this.changePass(user,pass);
    });
  }

  changePass(user:LoginUser,lastPassword): any {

    this.userService.changePassord(user,this.requestId).subscribe(data => {
    this.router.navigate(['/home']);
      },
       err => {
        // user.password=lastPassword;
        // console.log(err.message);
        alert("invalid");
      
      });
  }


}
