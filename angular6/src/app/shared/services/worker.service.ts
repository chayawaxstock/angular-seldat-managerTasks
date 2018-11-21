import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PresentDay } from '../models/pressentDay';
import { Observable } from 'rxjs';
import { Global } from './global';
import { SendEmail } from '../models/sendEmail';
import { Project } from '../models/project';
import { ProjectWorker } from '../models/projectWorker';

@Injectable()
export class WorkerService {
 
  constructor(public httpClient:HttpClient) { }
  
  updateDayPressent(pressentDay:PresentDay): Observable<any> {
      return this.httpClient.put(Global.baseURI+"updatePresentDay",pressentDay)
    }

  sendEmail(message: SendEmail,userId:number=1): Observable<any> {
   return this.httpClient.put(Global.baseURI+"sendMessageToManagers/"+userId,message );
  }

  getHoursForUserProjects(userId: number): Observable<any> {
    //TODO:לשנות את הניתוב
      return this.httpClient.get(Global.baseURI+"getSumHoursDoneForUsers/"+userId);
  }

  getProjectsUser(userId):Observable<Project[]>
  {
     return this.httpClient.get<Project[]>(Global.baseURI+"getProjectsById/"+userId);
  }

  addPresentDay(pressantDay: PresentDay): Observable<any> {
   return this.httpClient.post(Global.baseURI+"AddPresent",pressantDay);
  }
  getTasksOfWorker(userId):Observable<ProjectWorker[]>{

    return this.httpClient.get<ProjectWorker[]>(Global.baseURI+"getProjectsById/"+userId);

  }
   

 


}
