import { Component, OnInit } from '@angular/core';
import { Project } from '../shared/models/project';
import { ManagerService } from '../shared/services/manager.service';
import { FormControl, FormGroup } from '@angular/forms';
import { createValidatorText, createValidatorDateBegin, createValidatorNumber, validateDateEnd, validateSumHourForDepartment } from '../shared/validators/user.validation';
import { DepartmentUser } from '../shared/models/departmentUser';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { HourForDepartment } from '../shared/models/hourForDepartment';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit {

  obj: typeof Object = Object;
  formGroup: any;
  user: any;
  project: Project = new Project();
  projectManager: string;
  teamLeaders: User[] = [];
  departments: DepartmentUser[] = [];
  hoursForDepartment:HourForDepartment[]=[];
  departmentsHours: Int32Array[];
  isChecked: boolean = false;
  isNew: boolean;
  projectAdd:Project=new Project();
  public active = true;
  usersByDepartments: Array<{ text: string, value: number }> = [];
  x:any;
  public dateBegin: Date = new Date(2000, 2, 10);
  public dateEnd: Date = new Date(2000, 2, 10);
  constructor(

    public managerService: ManagerService,
     public userService: UserService,
      public router: Router) {

    this.project = this.managerService.project;
    this.isNew = this.managerService.isNew;

    //get all teamLeader
    this.managerService.getUsersByDepartment("teamLeader")
    .subscribe(users => {
      users.forEach((element: User) => {
        this.usersByDepartments.push({ text: element.userName, value: element.userId })
      });
  });

    let formGroupConfig = {
      projectName: new FormControl(this.project.projectName, createValidatorText("projectName", 2, 15)),
      customerName: new FormControl(this.project.customerName, createValidatorText("customerName", 2, 15)),
      dateBegin: new FormControl(new Date(this.project.dateBegin), createValidatorDateBegin("dateBegin")),
      dateEnd: new FormControl(new Date( this.project.dateEnd)),
      numHourForProject: new FormControl(this.project.numHourForProject, createValidatorNumber("numHourForProject", 1, 20000)),
      idManager: new FormControl(this.projectManager),
      hoursForDepartment: new FormControl(),
    };

    this.departmentsHours = new Array(Number(4));
    this.formGroup = new FormGroup(formGroupConfig, [validateDateEnd]);

  }

  ngOnInit() {
    this.userService.getAllDepartments()
    //get only department worker
    .subscribe(departments => {
      this.departments = departments.filter(x => x.id > 2);
    });
  }

  Ischecked() {
   this.isChecked=!this.isChecked;
  }

  editProject() {
    validateSumHourForDepartment(this.formGroup,this.project)
    if (this.formGroup.invalid) {
      return;
    }
    else {
    
      let department = this.project.hoursForDepartment;
      let projectId = this.project.projectId;
      this.project = this.formGroup.value;
      this.project.hoursForDepartment = department;
      this.project.projectId = projectId;
      this.project.isFinish = this.isChecked;
      this.project.idManager = this.managerService.project.idManager;
      this.project.dateBegin.setDate(this.project.dateBegin.getDate() + 1 );
      this.project.dateEnd.setDate(this.project.dateEnd.getDate() + 1 );
      this.managerService.editProjct(this.project)
      .subscribe(res => {
        this.managerService.subjectProject.next("true");
        swal({
          type: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(["/manager/allProjects"])
      }, err =>
       this.managerService.getErrorMessage());
    }
  }
//    convert(str) {
//     var date = new Date(str),
//         mnth = ("0" + (date.getMonth()+1)).slice(-2),
//         day  = ("0" + date.getDate()).slice(-2);
//     return [ date.getFullYear(), mnth, day ].join("-");
// }

  addProject() {
    validateSumHourForDepartment(this.formGroup,this.project)
    if (this.formGroup.invalid) {
      return;
    }
    else {
    
      this.projectAdd=this.project;
      this.project = this.formGroup.value;
    //  this.project.dateBegin=new Date( this.convert(this.project.dateBegin));
    //  this.project.dateEnd=new Date( this.convert(this.project.dateEnd));
      this.project.hoursForDepartment = [];   
      let numHour: HourForDepartment;

      this.departments.forEach(element => {
        numHour = new HourForDepartment();
        numHour.sumHours = Number(element["hourForDepartment"]);
        numHour.departmentId = element["id"];
        this.project.hoursForDepartment.push(numHour);
      });

      this.project.hoursForDepartment=this.projectAdd.hoursForDepartment;

      this.managerService.addProject(this.project)
      .subscribe(res => {
        this.managerService.subjectProject.next("true");
        swal({
          type: 'success',
          title: 'Success',
          showConfirmButton: false,
          timer: 1500
        });

        this.router.navigate(["/manager/allProjects"])
      }, err => {
        {
         this.managerService.getErrorMessage();
        }
      });
    }
  }

    numDepartment(department1: HourForDepartment)
    {
      this.project.hoursForDepartment[department1.departmentId - 3].sumHours = department1.sumHours;
    }

    public onCancel(e): void {
    e.preventDefault();
    this.closeForm();
  }

  private closeForm(): void {
    this.active = false;
    this.router.navigate(["/manager/allProjects"])
  }
}


