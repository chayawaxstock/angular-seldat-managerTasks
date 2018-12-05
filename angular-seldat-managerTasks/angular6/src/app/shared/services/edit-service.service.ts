import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { tap } from 'rxjs/operators/tap';
import { map } from 'rxjs/operators/map';
import { ManagerService } from './manager.service';
import { User } from '../models/user';
import { Global } from './global';


const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

@Injectable()
export class EditService extends BehaviorSubject<any[]> {
    constructor(private http: HttpClient) {
        super([]);
    }
   
     data: any[] = [];

    public read() {
        
        if (this.data.length) {
            return super.next(this.data);
        }

        this.fetch()
            .pipe(
                tap(data => {
                    this.data = data;
                })
            )
            .subscribe(data => {
                super.next(data);
            });
    }

    public save(data: any, isNew?: boolean) {
        const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

        this.reset();

        this.fetch(action, data)
            .subscribe(() => this.read(), () => this.read());
    }

    public remove(data: any) {
        this.reset();

        this.fetch(REMOVE_ACTION, data)
            .subscribe(() => this.read(), () => this.read());
    }

    public resetItem(dataItem: any) {
        if (!dataItem) { return; }

        // find orignal data item
        const originalDataItem = this.data.find(item => item.ProductID === dataItem.ProductID);

        // revert changes
        Object.assign(originalDataItem, dataItem);

        super.next(this.data);
    }

    reset() {
        this.data = [];
    }

    public fetch(action: string = '', data?: any): Observable<any[]> {
        if(Global.idProjectToGetWorker==0)
        return this.http.get("http://localhost:12988/api/Users/getAllUsers")
            .pipe(map(res => <any[]>res));
        return this.http.get<User[]>(Global.baseURI+"getWorkerInProject/"+Global.idProjectToGetWorker)
            .pipe(map(res => <any[]>res));

    }

  
    private serializeModels(data?: any): string {
        return data ? `&models=${JSON.stringify([data])}` : '';
    }
}