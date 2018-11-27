import { Component, OnInit, Input } from '@angular/core';
import { DepartmentUser } from '../shared/models/departmentUser';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})
export class DepartmentDetailsComponent implements OnInit {

  constructor() { }

  @Input() department:DepartmentUser[];
  ngOnInit() {
    console.log(this.department);
  }

}
