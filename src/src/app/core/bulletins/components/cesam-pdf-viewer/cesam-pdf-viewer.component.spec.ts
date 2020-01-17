import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CesamPdfViewerComponent } from './cesam-pdf-viewer.component';

describe('CesamPdfViewerComponent', () => {
  let component: CesamPdfViewerComponent;
  let fixture: ComponentFixture<CesamPdfViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CesamPdfViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CesamPdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
