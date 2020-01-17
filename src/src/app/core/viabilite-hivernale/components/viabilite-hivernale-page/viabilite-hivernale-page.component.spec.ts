import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { viabiliteHivernalePageComponent } from './viabilite-hivernale-page.component';

describe('viabiliteHivernalePageComponent', () => {
  let component: viabiliteHivernalePageComponent;
  let fixture: ComponentFixture<viabiliteHivernalePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ viabiliteHivernalePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(viabiliteHivernalePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
