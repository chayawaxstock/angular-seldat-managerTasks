import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './services/user.service';
import { Global } from './services/global';
import { DepartmentEnum } from './departmentEnum';


@Injectable()
export class AuthGuardManager implements CanActivate {

    constructor(private router: Router,public userService:UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(this.userService.currentUser.departmentId==DepartmentEnum.MANAGER)
      return true;
        this.router.navigate(['/home']);
        return false;
    }
}