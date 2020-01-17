import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeAnnuairesComponent } from './liste-annuaires.component';

describe('ListeAnnuairesComponent', () => {
  let component: ListeAnnuairesComponent;
  let fixture: ComponentFixture<ListeAnnuairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeAnnuairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeAnnuairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
