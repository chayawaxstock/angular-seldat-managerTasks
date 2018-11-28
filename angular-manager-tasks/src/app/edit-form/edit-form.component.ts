import { Component, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Product } from '../shared/models/product';
import { createValidatorNumber, DepartmentEnum, createValidatorText } from '../shared/validators/user.validation';
import { User } from '../shared/models/user';
import { DepartmentUser } from '../shared/models/departmentUser';
import { UserService } from '../shared/services/user.service';
import { ManagerService } from '../shared/services/manager.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2'
import { EditService } from '../shared/services/edit-service.service';


@Component({
    selector: 'kendo-grid-edit-form',
    styles: [
        'input[type=text] { width: 100%; }'
    ],
    template: `
        <kendo-dialog *ngIf="active" (close)="closeForm()">
          <kendo-dialog-titlebar>
            {{ isNew ? 'Add new user' : 'Edit user' }}
          </kendo-dialog-titlebar>

            <form novalidate [formGroup]="editForm">
                <div class="form-group">
                    <label for="userName" class="control-label">User name</label>

                    <input type="text" class="k-textbox" formControlName="userName" />

                   
                </div>
                <div class="form-group">
                    <label for="email" class="control-label">email</label>

                    <input type="text" class="k-textbox" formControlName="email" />
                </div>
                <div class="form-group">
                    <label for="email" class="control-label">email</label>

                    <input type="text" class="k-textbox" formControlName="email" />

                   
                    </div>
                    <div class="form-group">
                    <label for="numHoursWork" class="control-label">numHoursWork</label>

                    <input type="number" class="k-textbox" formControlName="numHoursWork" />

                   
                    </div>

                    <div class="example-wrapper">
      <p>chooseDepartment</p>
      <div *ngIf="departments.length>0">
      <kendo-dropdownlist   formControlName="departmentId"  [data]="departments"   [textField]="'text'"
      [valueField]="'value'"
      [valuePrimitive]="true"   [defaultItem]="defaultItem" (valueChange)="chooseDepartment($event)" >
      </kendo-dropdownlist>
    </div>
    </div>

    <div class="example-wrapper">
    <p>teamleader</p>
    <kendo-dropdownlist *ngIf="user" [data]="usersByDepartments"  [textField]="'text'" [valueField]="'value'"  [defaultItem]="defaultItemTeamleader"    >
    </kendo-dropdownlist>
  </div>
                          
            </form>

            <kendo-dialog-actions>
                <button class="k-button" (click)="onCancel($event)">Cancel</button>
                <button class="k-button k-primary" [disabled]="!editForm.valid" (click)="onSave($event)">Save</button>
            </kendo-dialog-actions>
        </kendo-dialog>
    `
})
export class GridEditFormComponent {
    private editService: EditService;
    departments:Array< { text: string, value: number }>=[];
    usersByDepartments:Array< { text: string, value: number }>=[];
    constructor(public userService: UserService, public managerService: ManagerService, public router: Router,@Inject(EditService) editServiceFactory: any) {
        this.editService = editServiceFactory();
        userService.getAllDepartments().subscribe(departments => {
      
         departments.forEach((element:DepartmentUser) => {
                this.departments.push({text:element.department,value:element.id})
            });
            console.log(this.departments);

        });
    }

    public active = false;
    public emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    public editForm: FormGroup = new FormGroup({
        'userName': new FormControl('', Validators.required),
        'email': new FormControl("", createValidatorText("email", 5, 30, this.emailPattern)),
        'numHoursWork': new FormControl("", createValidatorNumber("numHoursWork", 4, 9)),
        'departmentId': new FormControl("", [Validators.required]),
        'managerId': new FormControl()

    });

  

    defaultItem: { text: string, value: number };
    defaultItemTeamleader:{ text: string, value: number };
   
    user: User = new User();
    @Input() public isNew = false;

    @Input() public set model(user: User) {
        if (user != undefined) {
            console.log(this.departments)
        
            this.managerService.userToEdit = user;
            this.user = user;
            this.defaultItem={text:user.departmentUser.department,value:user.departmentUser.id};
                        this.defaultItemTeamleader={text: user.manager.userName,value:user.manager.userId};
            this.editForm.reset(user);
        }
        this.active = user !== undefined;

    }

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<Product> = new EventEmitter();

    public onSave(e): void {
        e.preventDefault();
        this.editForm.value.userId = this.managerService.userToEdit.userId;
        this.managerService.updateUser(this.editForm.value).subscribe(res => {
            swal({
                position: 'top-end',
                type: 'success',
                title: 'Success!',
                showConfirmButton: false,
                timer: 1500
            })

            e.preventDefault();
         this.save.emit(this.editForm.value);
        }, err => {
            swal({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',

            })
        });
         
        this.active = false;
    }

    public onCancel(e): void {
        e.preventDefault();
        this.closeForm();

    }

    private closeForm(): void {
        this.active = false;
        this.cancel.emit();
    }

    chooseDepartment(value: any) {
        this.usersByDepartments=[];
        this.defaultItemTeamleader ={ text: "", value: null };//not work remove default value
        if (value == DepartmentEnum.TEAMLEADER) {
            this.managerService.getUsersByDepartment("manager").subscribe(users => {
                users.forEach((element:User) => {
                    this.usersByDepartments.push({text:element.userName,value:element.userId})
                });
                console.log(users);
               
            });
            this.defaultItemTeamleader.text = this.user.manager.userName;
        }
        else if (value != DepartmentEnum.MANAGER) {
            this.managerService.getUsersByDepartment("teamLeader").subscribe(users => {

                users.forEach((element:User) => {
                    this.usersByDepartments.push({text:element.userName,value:element.userId})
                });
                console.log(users);
              
            });
            this.defaultItemTeamleader.text = this.user.manager.userName;
        }
        else {
            this.usersByDepartments = [];
          
        }
    }
}

