import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Inject } from '@angular/core';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';


import { EditService } from '../shared/services/edit-service.service';

import { map } from 'rxjs/operators/map';
import { User } from '../shared/models/user';

@Component({
  selector: 'app-grid-edit',
  templateUrl: './grid-edit.component.html',
  styleUrls: ['./grid-edit.component.scss']
})
export class GridEditComponent implements OnInit {

  public view: Observable<GridDataResult>;
    public gridState: State = {
        sort: [],
        skip: 0,
        take: 10
    };

    public editDataItem: User;
    public isNew: boolean;
    private editService: EditService;

    constructor(@Inject(EditService) editServiceFactory: any) {
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
        this.editDataItem = new User();
        this.isNew = true;
    }

    public editHandler({dataItem}) {
        this.editDataItem = dataItem;
        this.isNew = false;
    }

    public cancelHandler() {
        this.editDataItem = undefined;
    }

    public saveHandler(product: User) {
        this.editService.save(product, this.isNew);

        this.editDataItem = undefined;
    }

    public removeHandler({dataItem}) {
        this.editService.remove(dataItem);
    }

}
