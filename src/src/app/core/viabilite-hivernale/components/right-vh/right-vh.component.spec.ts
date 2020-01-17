import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightVhComponent } from './right-vh.component';

describe('RightVhComponent', () => {
  let component: RightVhComponent;
  let fixture: ComponentFixture<RightVhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightVhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightVhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
