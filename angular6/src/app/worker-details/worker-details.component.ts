import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-worker-details',
  templateUrl: './worker-details.component.html',
  styleUrls: ['./worker-details.component.css']
})
export class WorkerDetailsComponent implements OnInit {
@Input()workers:any;
  constructor() { }

  ngOnInit() {
    console.log(this.workers);
  }

}
