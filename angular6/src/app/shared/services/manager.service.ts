import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Project } from '../models/project';

@Injectable()
export class ManagerService {

  userToEdit: User;
  subjectAllUsers= new Subject();
  subjectWorkerToProject=new Subject();
  subjectProject=new Subject();
  workerToProject: Project;
  project: Project;
  constructor(public httpClient: HttpClient) { }


  getUsersByDepartment(idDepertmant:string): Observable<User[]> {
      return this.httpClient.get<User[]>(Global.baseURI+"Users/getUsersByDepartment/"+idDepertmant)
  } 
  
  addUser(user: User): Observable<any> {
    return this.httpClient.post(Global.baseURI+"addUser",user);
  }

   updateUser(user: User): Observable<any> {   
     console.log("update");
   return this.httpClient.put(Global.baseURI+"updateUser",user);
  }
  
  deleteUser(idUser: number): Observable<any> {
        return this.httpClient.delete(Global.baseURI+"deleteUser/"+idUser);
    }
    deleteProject(idProject: number): Observable<any> {
      return this.httpClient.delete(Global.baseURI+"deleteProject/"+idProject);
  }

  createReport(reportName:string): Observable<any> {
     return this.httpClient.get(Global.baseURI+"createReport1/"+reportName);
    }
    
  addProject(project: Project): Observable<any> {
    return this.httpClient.post(Global.baseURI+"Projects",project);
  }
  
  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(Global.baseURI+"getAllProjects");
  }

  getWorkerNotInProject(projectId: number): Observable<User[]> {
    return this.httpClient.get<User[]>(Global.baseURI+"getWorkerNotProject/"+projectId);
  }

  addWorkersToProject(projectId:number,workers:User[]):Observable<any>
  {
    console.log(workers);
  return this.httpClient.put(Global.baseURI+"addWorkersToProject/"+projectId,workers);
  }

  getWorkerInProject(projectId:number): Observable<User[]> {
    return this.httpClient.get<User[]>(Global.baseURI+"getWorkerInProject/"+projectId)
  }

}
