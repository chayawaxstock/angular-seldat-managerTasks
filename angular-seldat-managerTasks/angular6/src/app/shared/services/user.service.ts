import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../models/loginUser';

import { Global } from './global';
import { Observable, Subject } from 'rxjs';
import { DepartmentEnum } from '../validators/user.validation';
import { Router } from '@angular/router';
import { isPrimitive } from 'util';

@Injectable()
export class UserService {

  timer = 0;
  subject = new Subject();
  currentUser: User
  subjectAllProjects = new Subject();
  isFirst:boolean=true;
  constructor(public httpClient: HttpClient, private router: Router) {
  }
  checkDepartment() {
    if (this.currentUser.departmentId == DepartmentEnum.TEAMLEADER)
      this.router.navigate(['/teamLeader']);
    else if (this.currentUser.departmentId == DepartmentEnum.MANAGER)
      this.router.navigate(['/manager']);
    else this.router.navigate(['/worker']);
  }
  signInUser(user: LoginUser): Observable<User> {
    return this.httpClient.post<User>(Global.baseURI + "loginByPassword", user)
  }

  loginByUserComputer(ip: string): Observable<User> {
    let formData: FormData = new FormData();
    formData.append('ip', ip);
    return this.httpClient.post<User>(Global.baseURI + "LoginByComputerUser", formData)
  }

  forgetPassword(userName: string): Observable<any> {
    let formData: FormData = new FormData();
    formData.append('userName', userName);
    return this.httpClient.post<any>(Global.baseURI + "ForgetPassword", formData)
  }
  changePassord(user:LoginUser,requestId:number): Observable<any>
  {
    return this.httpClient.put(Global.baseURI+"ChangePassword/"+requestId,user);
  }
  getAllDepartments(): Observable<any> {
    return this.httpClient.get<any>(Global.baseURI + "Department/getAllDepartments");
  }

  getAllUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(Global.baseURI + "Users/getAllUsers");
  }

  getIp(): Observable<any> {
    return this.httpClient.get("https://api.ipify.org/?format=json")
  }
  getHoursForProjectsByUser(userId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(Global.baseURI + "Users/getHoursForUserProjects/" + userId);
  }


}
