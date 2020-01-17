import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntervenantsAstreinteComponent } from './intervenants-astreinte.component';

describe('IntervenantsAstreinteComponent', () => {
  let component: IntervenantsAstreinteComponent;
  let fixture: ComponentFixture<IntervenantsAstreinteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntervenantsAstreinteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntervenantsAstreinteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
