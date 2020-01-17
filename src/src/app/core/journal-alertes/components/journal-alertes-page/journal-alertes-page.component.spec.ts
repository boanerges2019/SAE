import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalAlertesPageComponent } from './journal-alertes-page.component';

describe('JournalAlertesPageComponent', () => {
  let component: JournalAlertesPageComponent;
  let fixture: ComponentFixture<JournalAlertesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalAlertesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalAlertesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
