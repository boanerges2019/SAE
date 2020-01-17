import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JournalHistoExtractionComponent } from './journal-histo-extraction.component';

describe('JournalHistoExtractionComponent', () => {
  let component: JournalHistoExtractionComponent;
  let fixture: ComponentFixture<JournalHistoExtractionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JournalHistoExtractionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JournalHistoExtractionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
