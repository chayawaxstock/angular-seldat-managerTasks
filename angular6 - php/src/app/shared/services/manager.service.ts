import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';
import { Project } from '../models/project';
import { ProjectWorker } from '../models/projectWorker';
import swal from 'sweetalert2';

@Injectable()
export class ManagerService {

  userToEdit: User;
  subjectAllUsers= new Subject();
  subjectWorkerToProject=new Subject();
  subjectProject=new Subject();
  subjectIsShow=new Subject();
  workerToProject: Project;
  project: Project;
  isNew:boolean;
  isShow:boolean;
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

  createReport( idReport:number): Observable<any> {
     return this.httpClient.get(Global.baseURI+"createReport/"+idReport);
    }
    
  addProject(project: Project): Observable<any> {
    return this.httpClient.post(Global.baseURI+"Projects",project);
  }
  editProjct(project: Project): Observable<any> 
  {
    return this.httpClient.put(Global.baseURI+"updateProject",project);
  }
  
  getAllProjects(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(Global.baseURI+"getAllProjects");
  }

  getWorkerNotInProject(projectId: number): Observable<User[]> {
    return this.httpClient.get<User[]>(Global.baseURI+"getWorkerNotProject/"+projectId);
  }

  addWorkersToProject(projectId:number,workers:ProjectWorker[]):Observable<any>
  {
    console.log(workers);
  return this.httpClient.put(Global.baseURI+"addWorkersToProject/"+projectId,workers);
  }

  getWorkerInProject(projectId:number): Observable<User[]> {
    return this.httpClient.get<User[]>(Global.baseURI+"getWorkerInProject/"+projectId)
  }
  getErrorMessage()
  {
    swal({
      type: 'error',
      title: 'Oops...',
      text: 'Something went wrong!', 
    })
  }
}
