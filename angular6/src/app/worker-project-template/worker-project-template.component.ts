import { Component, OnInit, Input } from '@angular/core';
import { ProjectWorker } from '../shared/models/projectWorker';

@Component({
  selector: 'app-worker-project-template',
  templateUrl: './worker-project-template.component.html',
  styleUrls: ['./worker-project-template.component.css']
})
export class WorkerProjectTemplateComponent implements OnInit {
@Input()
project:ProjectWorker;

  constructor() { }

  ngOnInit() {
  }

}
