import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss']
})
export class TextareaComponent  {

   //----------------PROPERTIRS-------------------
   @Input()
   formcontrol: FormControl;
   @Input()
   placeholder: string;

   //allow access 'Object' type via interpolation
   objectHolder: typeof Object = Object;
   /**
    *
    */
   constructor() {
   }
 

}