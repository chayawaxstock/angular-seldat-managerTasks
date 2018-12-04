import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Inject } from '@angular/core';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { Product } from './/shared/models/product';
import { EditService } from './/shared/services/edit-service.service';

import { map } from 'rxjs/operators/map';
import swal from 'sweetalert2';
import { ManagerService } from './shared/services/manager.service';

@Component({
  selector: 'app-root',
  template: `
      <kendo-grid
          [data]="view | async"
          [height]="533"
          [pageSize]="gridState.take" [skip]="gridState.skip" [sort]="gridState.sort"
          [pageable]="true" [sortable]="true"
          (dataStateChange)="onStateChange($event)"
          (edit)="editHandler($event)" (remove)="removeHandler($event)"
          (add)="addHandler($event)"
        >
        <ng-template kendoGridToolbarTemplate>
            <button kendoGridAddCommand>Add new</button>
        </ng-template>
        <kendo-grid-column field="userName" title="userName"></kendo-grid-column>
        <kendo-grid-column field="email" title="email"></kendo-grid-column>
        <kendo-grid-column field="departmentUser.department" title="departmentUser"></kendo-grid-column>
        <kendo-grid-column field="manager.userName" title="manager"></kendo-grid-column>
        <kendo-grid-column field="numHoursWork" title="numHoursWork"></kendo-grid-column>
        <kendo-grid-command-column title="command" width="220">
            <ng-template kendoGridCellTemplate>
                <button kendoGridEditCommand [primary]="true">Edit</button>
                <button kendoGridRemoveCommand>Delete</button>
            </ng-template>
        </kendo-grid-command-column>
      </kendo-grid>

      <kendo-grid-edit-form1 [model]="editDataItem" [isNew]="isNew"
          (save)="saveHandler($event)"
          (cancel)="cancelHandler()">
      </kendo-grid-edit-form1>
  `
})
export class AppComponent implements OnInit {
    public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };

    public editDataItem: Product;
    public isNew: boolean;
    private editService: EditService;

    constructor(@Inject(EditService) editServiceFactory: any, public managerService: ManagerService) {
        this.editService = editServiceFactory();
    }

    public ngOnInit(): void {
        this.view = this.editService.pipe(map(data => process(data, this.gridState)));

        this.editService.read();
    }

    public onStateChange(state: State) {
        this.gridState = state;

        this.editService.read();
    }

    public addHandler() {
        this.editDataItem = new Product();
        this.isNew = true;
    }

    public editHandler({dataItem}) {
        this.editDataItem = dataItem;
        this.isNew = false;
    }

    public cancelHandler() {
        this.editDataItem = undefined;
    }

    public saveHandler(product: Product) {
        this.editService.save(product, this.isNew);

        this.editDataItem = undefined;
    }

    public removeHandler({dataItem}) {
        swal({
            title: `Are you sure you want to delete ${dataItem.userName}?`,
            text: "You won't be able to revert this!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.value) {
                this.managerService.deleteUser(dataItem).subscribe(res=>{   swal(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                  )},err=>{swal({
                    type: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong!',
                   
                  })});

           
            }
          })
        
    }
}
