import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../shared/models/product';
import { User } from '../shared/models/user';

@Component({
  selector: 'kendo-grid-edit-form',
  templateUrl: './grid-model.component.html',
  styleUrls: ['./grid-model.component.scss']
})
export class GridModelComponent  {

  public active = false;
  public editForm: FormGroup = new FormGroup({
      'ProductID': new FormControl(),
      'ProductName': new FormControl('', Validators.required),
      'UnitPrice': new FormControl(0),
      'UnitsInStock': new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
      'Discontinued': new FormControl(false)
  });

  @Input() public isNew = false;

  @Input() public set model(product: User) {
      this.editForm.reset(product);

      this.active = product !== undefined;
  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<User> = new EventEmitter();

  public onSave(e): void {
      e.preventDefault();
      this.save.emit(this.editForm.value);
      this.active = false;
  }

  public onCancel(e): void {
      e.preventDefault();
      this.closeForm();
  }

  private closeForm(): void {
      this.active = false;
      this.cancel.emit();
  }

}
