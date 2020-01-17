import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2DatetimePickerComponent } from './ng2-datetime-picker.component';

describe('Ng2DatetimePickerComponent', () => {
  let component: Ng2DatetimePickerComponent;
  let fixture: ComponentFixture<Ng2DatetimePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Ng2DatetimePickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Ng2DatetimePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
