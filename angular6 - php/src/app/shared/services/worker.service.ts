import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PresentDay } from '../models/pressentDay';
import { Observable, Subject } from 'rxjs';
import { Global } from './global';
import { SendEmail } from '../models/sendEmail';


@Injectable()
export class WorkerService {
 
  timerSubject=new Subject();
  constructor(public httpClient:HttpClient) { }
  
  updateDayPressent(pressentDay:PresentDay): Observable<any> {
    debugger;
      return this.httpClient.put(Global.baseURLPHP+"/presenceday/updatePresenceDayWorker",pressentDay)
    }

  sendEmail(message: SendEmail,userId:number): Observable<any> {
   return this.httpClient.put(Global.baseURI+"sendMessageToManagers/"+userId,message );
  }

  // getHoursForUserProjects(userId: number): Observable<any> {
  //   //TODO:לשנות את הניתוב
  //     return this.httpClient.get(Global.baseURI+"getSumHoursDoneForUsers/"+userId);
  // }

  // getProjectsUser(userId):Observable<Project[]>
  // {
  //    return this.httpClient.get<Project[]>(Global.baseURI+"/user/getProjectsById/"+userId);
  // }

  addPresentDay(pressantDay: PresentDay): Observable<any> {
   return this.httpClient.post(Global.baseURI+"AddPresent",pressantDay);
  }

  getTasksOfWorker(userId):Observable<ProjectWorker[]>{
    return this.httpClient.get<ProjectWorker[]>(Global.baseURLPHP+"/projectworker/getProjectsByUserId?userId="+userId);
  }
   
}
