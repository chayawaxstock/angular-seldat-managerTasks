import { Injectable } from '@angular/core';

import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../models/loginUser';

import { Global } from './global';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class UserService {

  timer=0;
  subject=new Subject();
  currentUser: User

  constructor(public httpClient: HttpClient) {
  }

  signInUser(user: LoginUser): Observable<User> {
    return this.httpClient.post<User>(Global.baseURI+"loginByPassword",user)
  }

  loginByUserComputer() {

  }

  logOut()
  {

  }
  getAllDepartments(): Observable<any> {
   return this.httpClient.get<any>(Global.baseURI+"Department/getAllDepartments");
  }

   getAllUsers(): Observable<User[]> {
      return this.httpClient.get<User[]>(Global.baseURI+"Users/getAllUsers");
  }

  getIp(): Observable<any> {   
  return this.httpClient.get("https://api.ipify.org/?format=json")
  }


}
