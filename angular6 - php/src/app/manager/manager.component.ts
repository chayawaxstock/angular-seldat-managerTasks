import { Component, Input } from '@angular/core';
import {ViewChild } from '@angular/core';
import { Project } from '../shared/models/project';
import { ManagerService } from '../shared/services/manager.service';
import { User } from '../shared/models/user';
import { Router } from '@angular/router';
import { Global } from '../shared/services/global';
import { SignaturePad } from 'angular2-signaturepad/signature-pad';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent  {
  @ViewChild(SignaturePad) signaturePad: SignaturePad;
  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300,
    
  };
  projects: Project[] = [];
  @Input() loginInfo: User;
  constructor(public managerService: ManagerService, public router: Router) { }

  activeRoute(routename: string): boolean {
    return this.router.url.indexOf(routename) > -1;
  }
  allUsers() {
    Global.idProjectToGetWorker = 0;
    this.managerService.subjectIsShow.next(0);
  }
  ngAfterViewInit() {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }
 
  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }
 
  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }
  ok()
  {
    alert("ok");  
  }

  clear()
  {
    this.signaturePad.clear();
  }
}
