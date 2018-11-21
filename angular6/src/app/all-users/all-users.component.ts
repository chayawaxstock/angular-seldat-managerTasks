import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { ManagerService } from '../shared/services/manager.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {

  users: User[] = [];

  constructor(public userService: UserService, public managerService: ManagerService, public router: Router) {

    this.getAllUsers();
  }

  ngOnInit() {

  }

  addUser() {
    this.router.navigate(['/manager/addUser']);
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(res => {
      console.log(res);
      this.users = res;
    });
  }

  deleteUser(id: number) {

    swal({
      title: 'Are you sure you want to delete this worker?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.value) {
        let indexUser = this.users.findIndex(p => p.userId == id)
        this.managerService.deleteUser(id).subscribe(res => {
          this.users.splice(indexUser, 1);


          swal(
            'Deleted!',
            'The worker has been deleted.',
            'success'
          )
        },err=>{swal({
          type: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
         
        })})



      }

    })
  }
}


