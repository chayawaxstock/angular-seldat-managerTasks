import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { Project } from '../models/project';
import { Global } from './global';


@Injectable()
export class ManagmerService {
  userToEdit: User;
  subjectAllUsers= new Subject();
  subjectWorkerToProject=new Subject();
  subjectProject=new Subject();
  subjectAllProjects=new Subject();
  workerToProject: Project;
  project: Project;

  constructor(public httpClient: HttpClient) { }


  getUserByDepartment(idDepertmant:string): Observable<User[]> {
      return this.httpClient.get<User[]>(Global.baseURI+"Users/getUsersByDepartment/"+idDepertmant)
  } 
  
  addUser(user: User): Observable<any> {
    return this.httpClient.post(Global.baseURI+"addUser",user);
  }

   updateUser(user: User): Observable<any> {   
   return this.httpClient.put(Global.baseURI+"updateUser",user);
  }
  
  deleteUser(idUser: number): Observable<any> {
        return this.httpClient.delete(Global.baseURI+"deleteUser/"+idUser);
    }
    
  addProject(project: Project): Observable<any> {
    return this.httpClient.post(Global.baseURI+"Projects",project);
  }
  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(Global.baseURI+"getAllProjects");
  }

  addWorkersToProject(projectId:number,workers:User[]):Observable<any>
  {
  return this.httpClient.put(Global.baseURI+"addWorkersToProject/"+projectId,workers);
  }

  getWorkerInProject(projectId:number): Observable<User[]> {
    return this.httpClient.get<User[]>(Global.baseURI+"getWorkerInProject/"+projectId)
  }

  getUsersByDepartment(idDepertmant:string): Observable<User[]> {
    return this.httpClient.get<User[]>(Global.baseURI+"Users/getUsersByDepartment/"+idDepertmant)
} 

  deleteProject(idProject: number): Observable<any> {
    return this.httpClient.delete(Global.baseURI+"deleteProject/"+idProject);
}

createReport(): Observable<any> {
   return this.httpClient.get(Global.baseURI+"createReport/1");
  }
  
editProjct(project: Project): Observable<any> 
{
  return this.httpClient.put(Global.baseURI+"updateProject",project);
}

getWorkerNotInProject(projectId: number): Observable<User[]> {
  return this.httpClient.get<User[]>(Global.baseURI+"getWorkerNotProject/"+projectId);
}

}
