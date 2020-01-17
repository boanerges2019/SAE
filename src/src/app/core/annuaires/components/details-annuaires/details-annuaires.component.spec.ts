import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsAnnuairesComponent } from './details-annuaires.component';

describe('DetailsAnnuairesComponent', () => {
  let component: DetailsAnnuairesComponent;
  let fixture: ComponentFixture<DetailsAnnuairesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsAnnuairesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsAnnuairesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
