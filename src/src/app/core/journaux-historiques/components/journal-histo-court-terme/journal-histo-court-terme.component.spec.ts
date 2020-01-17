import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalHistoCourtTermeComponent } from './journal-histo-court-terme.component';

describe('JournalHistoCourtTermeComponent', () => {
  let component: JournalHistoCourtTermeComponent;
  let fixture: ComponentFixture<JournalHistoCourtTermeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalHistoCourtTermeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalHistoCourtTermeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
