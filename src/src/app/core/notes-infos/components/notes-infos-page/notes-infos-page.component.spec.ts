import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesInfosPageComponent } from './notes-infos-page.component';

describe('NotesInfosPageComponent', () => {
  let component: NotesInfosPageComponent;
  let fixture: ComponentFixture<NotesInfosPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesInfosPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesInfosPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
