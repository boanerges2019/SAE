import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculesSftrfComponent } from './vehicules-sftrf.component';

describe('VehiculesSftrfComponent', () => {
  let component: VehiculesSftrfComponent;
  let fixture: ComponentFixture<VehiculesSftrfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiculesSftrfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculesSftrfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
