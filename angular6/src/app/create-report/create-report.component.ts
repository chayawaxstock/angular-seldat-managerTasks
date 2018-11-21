import { Component, OnInit } from '@angular/core';
import { ExcelService } from '../shared/services/excel.service';
import { ExcelExportData } from '@progress/kendo-angular-excel-export';
import { process } from '@progress/kendo-data-query';
import {
  GridComponent,
  GridDataResult,
  DataStateChangeEvent
} from '@progress/kendo-angular-grid';
import { State, CompositeFilterDescriptor, filterBy } from '@progress/kendo-data-query';

import { flatten } from '@progress/kendo-angular-grid/dist/es2015/filtering/base-filter-cell.component';
import { ManagerService } from '../shared/services/manager.service';
import { ReportProject } from '../shared/models/reportProject';

@Component({
  selector: 'app-create-report',
  templateUrl: './create-report.component.html',
  styleUrls: ['./create-report.component.css']
})
export class CreateReportComponent  {

  reportProject:ReportProject[]=[];
constructor(public excelServise:ExcelService,public managerService:ManagerService) {

   this.managerService.createReport("reportProject").subscribe(res=>{
    this.reportProject=res;
    this.gridData = filterBy(this.reportProject, this.filter);
   });
}
  name = 'Angular 6';
  data: any = [{
    eid: 'e101',
    ename: 'ravi',
    esal: 1000
  },
  {
    eid: 'e102',
    ename: 'ram',
    esal: 2000
  },
  {
    eid: 'e103',
    ename: 'rajesh',
    esal: 3000
  }];
 
  exportAsXLSX():void {
    this.excelServise.exportAsExcelFile(this.reportProject, 'reportProject');
  }


  public products: any[] = this.reportProject;
  public checked = false;
  public filter: CompositeFilterDescriptor;
  public gridData: any[] ;

  public filterChange(filter: CompositeFilterDescriptor): void {
      this.filter = filter;
      this.gridData = filterBy(this.reportProject, filter);
  }

  public switchChange(checked: boolean): void {
      const root = this.filter || { logic: 'and', filters: []};

      const [filter] = flatten(root).filter(x => x.field === 'Discontinued');

      if (!filter) {
          root.filters.push({
              field: 'Discontinued',
              operator: 'eq',
              value: checked
          });
      } else {
          filter.value = checked;
      }
      this.checked = checked;
      this.filterChange(root);
  }
  public allData(): ExcelExportData {
    const result: ExcelExportData =  {
        data: process(this.reportProject, { group: this.group, sort: [{ field: 'ProductID', dir: 'asc' }] }).data,
        group: this.group
    };

    return result;
}
public group: any[] = [{
  field: 'project.projectId'
}];
}



