import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridModelComponent } from './grid-model.component';

describe('GridModelComponent', () => {
  let component: GridModelComponent;
  let fixture: ComponentFixture<GridModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
