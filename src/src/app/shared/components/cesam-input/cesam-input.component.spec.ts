import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CesamInputComponent } from './cesam-input.component';

describe('CesamInputComponent', () => {
  let component: CesamInputComponent;
  let fixture: ComponentFixture<CesamInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CesamInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CesamInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
