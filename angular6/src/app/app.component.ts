import { Component, OnInit } from '@angular/core';
import { UserService } from './shared/services/user.service';
import { User } from './shared/models/user';
import { LoginUser } from './shared/models/loginUser';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
 
  constructor(public userService: UserService,private router: Router) {

  }
  // ip: string;
  // user:User
  ngOnInit() {

    //get ip cumputer-try login with ip
    // this.userService.getIp().subscribe(res => {
    //   this.ip = res.ip;
    //   this.userService.loginByUserComputer(this.ip).subscribe(x => {
    //     this.user = x;
    //     //save user in global prop
    //     this.userService.currentUser = x;

    //     //check promissing
    //     this.userService.checkDepartment();
    //   },err=>{
    //     //faild login
    //      this.router.navigate(['/home']);
    //   });
    // });
  }


}
