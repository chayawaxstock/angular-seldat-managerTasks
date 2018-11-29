import { Component, OnInit, Input } from '@angular/core';
import { ReportWorker } from '../shared/models/reportWorker';

@Component({
  selector: 'app-report-worker-template',
  templateUrl: './report-worker-template.component.html',
  styleUrls: ['./report-worker-template.component.css']
})
export class ReportWorkerTemplateComponent implements OnInit {

  @Input() pressents:any[];
  constructor() { }

  ngOnInit() {
  }

}
