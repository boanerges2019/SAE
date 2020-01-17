import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesInfosComponent } from './notes-infos.component';

describe('NotesInfosComponent', () => {
  let component: NotesInfosComponent;
  let fixture: ComponentFixture<NotesInfosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotesInfosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotesInfosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
