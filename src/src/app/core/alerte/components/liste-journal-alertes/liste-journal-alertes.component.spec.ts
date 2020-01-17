import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeJournalAlertesComponent } from './liste-journal-alertes.component';

describe('ListeJournalAlertesComponent', () => {
  let component: ListeJournalAlertesComponent;
  let fixture: ComponentFixture<ListeJournalAlertesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeJournalAlertesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeJournalAlertesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
