import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviAstreintesComponent } from './suivi-astreintes.component';

describe('SuiviAstreintesComponent', () => {
  let component: SuiviAstreintesComponent;
  let fixture: ComponentFixture<SuiviAstreintesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuiviAstreintesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuiviAstreintesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
