import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/models/project';
import { User } from '../shared/models/user';
import { DepartmentUser } from '../shared/models/departmentUser';
import { UserService } from '../shared/services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { createValidatorText, createValidatorDateBegin, createValidatorNumber, validateDateEnd } from '../shared/validators/user.validation';
import { HourForDepartment } from '../shared/models/hourForDepartment';
import { Router } from '@angular/router';
import { ManagerService } from '../shared/services/manager.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  obj: typeof Object = Object;
  formGroup: any;
  user: any;
  project:Project=new Project();

  teamLeaders: User[]=[];
  departments: DepartmentUser[]=[];
  departmentsHours: Int32Array[];;
 // types:string[]=["text","text","datetime","datetime","number","","",""]

  constructor(public managerService:ManagerService,public userService: UserService,public router:Router) {
    let formGroupConfig = {
      projectName: new FormControl("", createValidatorText("projectName", 2, 15)),
      customerName: new FormControl("", createValidatorText("customerName", 2, 15)),
      dateBegin:new FormControl("",createValidatorDateBegin("dateBegin")),
      dateEnd: new FormControl("",),
      numHourForProject: new FormControl("",createValidatorNumber("numHourForProject", 1, 20000)),
      idManager: new FormControl(""),
      hoursForDepartment:new FormControl(),
     
      
    };
    this.departmentsHours = new Array(Number(4));
    this.formGroup = new FormGroup(formGroupConfig,[validateDateEnd]);

   }

  ngOnInit() {
  
    this.userService.getAllDepartments().subscribe(departments=>{
       this.departments=departments.filter(x=>x.id>2);
      console.log(this.departments);
    });

    this.managerService.getUsersByDepartment("teamLeader").subscribe(res=>{
     
      console.log(res);
      this.teamLeaders=res;
    },err=>{
      console.log(err);
    });

  }
  
  addProject() {
    console.log(this.departmentsHours[0])
    console.log(new Date()>this.formGroup['dateBegin']);
      if (this.formGroup.invalid) {
        return;
      }
      else {
        this.project = this.formGroup.value;
        this.project.hoursForDepartment=[];
        let numHour:HourForDepartment;
        this.departments.forEach(element => {
        numHour=new HourForDepartment();
        numHour.sumHours=Number(element["hourForDepartment"]);
        numHour.departmentId=element["id"];
        this.project.hoursForDepartment.push(numHour);
        });
        console.log(this.project);
        
        this.managerService.addProject(this.project).subscribe(res=>{
        this.managerService.subjectProject.next("true");
        alert("succsess");
        },err=>{console.log("error")});
           
      }

     
    }

    numDepartment(department1:DepartmentUser)
    {
      console.log(department1 +" de");
      console.log(this.departments);
    }

}
