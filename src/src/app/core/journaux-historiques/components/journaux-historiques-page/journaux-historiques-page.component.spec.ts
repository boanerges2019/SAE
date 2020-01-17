import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournauxHistoriquesPageComponent } from './journaux-historiques-page.component';

describe('JournauxHistoriquesPageComponent', () => {
  let component: JournauxHistoriquesPageComponent;
  let fixture: ComponentFixture<JournauxHistoriquesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournauxHistoriquesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournauxHistoriquesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
