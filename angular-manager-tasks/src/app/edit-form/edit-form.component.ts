import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Product } from '../shared/models/product';
import { createValidatorNumber, DepartmentEnum, createValidatorText } from '../shared/validators/user.validation';
import { User } from '../shared/models/user';
import { DepartmentUser } from '../shared/models/departmentUser';
import { UserService } from '../shared/services/user.service';
import { ManagerService } from '../shared/services/manager.service';
import { Router } from '@angular/router';

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
      <kendo-dropdownlist  [data]="departments"  [textField]="'department'" [valueField]="'id'"   (valueChange)="chooseDepartment($event)" >
      </kendo-dropdownlist>
    </div>
                    <div class="form-group">
                    <select  formControlName="departmentId" (change)="chooseDepartment($event)">
                    <option *ngFor="let department of departments"  [value]="department.id">{{department.department}}</option>
                  </select>
                  </div>
                  <div class="form-group">
                 <select formControlName="managerId" *ngIf="userByDepartment.length>0" >
                     <option *ngFor="let manager of userByDepartment" [value]="manager.userId">{{manager.userName}}</option>
                  </select> 
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
    constructor(public userService: UserService, public managerService: ManagerService, public router: Router) {

        userService.getAllDepartments().subscribe(departments => {
            this.departments = departments;
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

    departments: DepartmentUser[] = [];
    userByDepartment: User[] = [];



    @Input() public isNew = false;

    @Input() public set model(product: Product) {
        this.editForm.reset(product);

        this.active = product !== undefined;
    }

    @Output() cancel: EventEmitter<any> = new EventEmitter();
    @Output() save: EventEmitter<Product> = new EventEmitter();

    public onSave(e): void {
        e.preventDefault();
        this.save.emit(this.editForm.value);
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

    chooseDepartment() {

        let value = this.editForm.controls['departmentId'].value;
        if (value == DepartmentEnum.TEAMLEADER) {
            this.managerService.getUsersByDepartment("manager").subscribe(users => {
                console.log(users);
                this.userByDepartment = users;
            });
        }
        else if (value != DepartmentEnum.MANAGER) {
            this.managerService.getUsersByDepartment("teamLeader").subscribe(users => {
                console.log(users);
                this.userByDepartment = users;
            });
        }
        else {
            this.userByDepartment = [];
        }
    }
}

