
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl
} from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-try',
  templateUrl: './try.component.html',
  styleUrls: ['./try.component.scss'],
template: `
  <form [formGroup]="myForm">
      <div class="example-config">
          <p>The form is valid: <strong>{{myForm.controls.gender.valid}}</strong></p>
          <p>The form.gender value is: <strong>{{myForm.controls.gender.value}}</strong></p>
      </div>
      <label>
          Select gender
          <kendo-dropdownlist
              formControlName="gender"
              [data]="genders"
              [defaultItem]="{ text: 'Select gender', value: null }"
              [textField]="'text'"
              [valueField]="'value'"
              [valuePrimitive]="true"
              required
          >
          </kendo-dropdownlist>
      </label>
  </form>
`
})
export class TryComponent  {
  public genders: Array<{ text: string, value: number }> = [
      { text: "Male", value: 1 },
      { text: "Female", value: 2 }
  ];

  public gender: { text: string, value: number };

  public myForm: FormGroup = new FormGroup({
      gender: new FormControl()
  });
}