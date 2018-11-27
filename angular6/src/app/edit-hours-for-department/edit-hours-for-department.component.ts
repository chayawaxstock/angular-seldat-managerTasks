import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DepartmentUser } from '../shared/models/departmentUser';
import { HourForDepartment } from '../shared/models/hourForDepartment';

@Component({
  selector: 'app-edit-hours-for-department',
  templateUrl: './edit-hours-for-department.component.html',
  styleUrls: ['./edit-hours-for-department.component.css']
})
export class EditHoursForDepartmentComponent implements OnInit {

  
  @Input()hourForDepartent:HourForDepartment;
 
  @Output() numDepartment: EventEmitter<HourForDepartment> = new EventEmitter<HourForDepartment>();
  
  constructor() { 
   
  }

  ngOnInit() {
    
    console.log(this.hourForDepartent);
  }

  changeNumHour()
  {
    
   
    this.numDepartment.emit(this.hourForDepartent) ;
  }

}
