import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircuitsVhComponent } from './circuits-vh.component';

describe('CircuitsVhComponent', () => {
  let component: CircuitsVhComponent;
  let fixture: ComponentFixture<CircuitsVhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircuitsVhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircuitsVhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
