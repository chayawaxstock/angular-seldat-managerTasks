import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/models/project';
import { ManagerService } from '../shared/services/manager.service';
import { FormControl, FormGroup } from '@angular/forms';
import { createValidatorText, createValidatorDateBegin, createValidatorNumber, validateDateEnd } from '../shared/validators/user.validation';
import { DepartmentUser } from '../shared/models/departmentUser';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { HourForDepartment } from '../shared/models/hourForDepartment';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  obj: typeof Object = Object;
  formGroup: any;
  user: any;
  project:Project=new Project();
  projectManager:string;
  teamLeaders: User[]=[];
  departments: DepartmentUser[]=[];
  departmentsHours: Int32Array[];
  isChecked:boolean=false;
  constructor(public managerService:ManagerService,public userService:UserService,public router:Router) {
    this.project=this.managerService.project;
    this.managerService.getUsersByDepartment("teamLeader").subscribe(res=>{
    
      console.log(res);
      this.teamLeaders=res;
      // this.projectManager=this.teamLeaders.find(x=>x.userId==this.project.idManager);
    },err=>{
      console.log(err);
    });
   
    let formGroupConfig = {
      projectName: new FormControl(this.project.projectName, createValidatorText("projectName", 2, 15)),
      customerName: new FormControl(this.project.customerName, createValidatorText("customerName", 2, 15)),
      dateBegin:new FormControl(this.project.dateBegin,createValidatorDateBegin("dateBegin")),
      dateEnd: new FormControl(this.project.dateEnd),
      numHourForProject: new FormControl(this.project.numHourForProject,createValidatorNumber("numHourForProject", 1, 20000)),
      idManager: new FormControl(this.projectManager),
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


  }
  Ischecked()
  {
   if (this.isChecked==false)
   this.isChecked=true;
   else this.isChecked=false;
  }
  editProject()
  {
    console.log(this.departmentsHours[0])
    console.log(new Date()>this.formGroup['dateBegin']);
      if (this.formGroup.invalid) {
        return;
      }
      else {
        let department=this.project.hoursForDepartment;
        let projectId= this.project.projectId;
        this.project = this.formGroup.value;
        this.project.hoursForDepartment=department;
       this.project.projectId=projectId;
       this.project.isFinish=this.isChecked;
        console.log(this.project);
        
        this.managerService.editProjct(this.project).subscribe(res=>{
        this.managerService.subjectProject.next("true");
        swal({
          position: 'top-end',
          type: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(["/manager/allProjects"])
        },err=>{console.log("error")});
           
      }

     
    }

    numDepartment(department1:HourForDepartment)
    {
      this.project.hoursForDepartment[department1.departmentId-1].sumHours=department1.sumHours;
    }
  }


