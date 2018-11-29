import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { type } from 'os';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent  {

 //----------------PROPERTIRS-------------------

 @Input()
 formControl: FormControl;

 @Input()
 placeholder: string;

 @Input()
 type: string = 'text';

 @Input()
 min: number;

 //allow access 'Object' type via interpolation
 objectHolder: typeof Object = Object;

 @Output()
 keyUpEvent: EventEmitter<void>

 //----------------CONSTRUCTOR------------------

 constructor() {
   this.keyUpEvent = new EventEmitter<void>();
 }

 //----------------METHODS-------------------

 keyUp() {
   this.keyUpEvent.emit();
 }

}
