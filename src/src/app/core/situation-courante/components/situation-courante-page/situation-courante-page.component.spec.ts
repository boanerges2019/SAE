import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SituationCourantePageComponent } from './situation-courante-page.component';

describe('SituationCourantePageComponent', () => {
  let component: SituationCourantePageComponent;
  let fixture: ComponentFixture<SituationCourantePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SituationCourantePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SituationCourantePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
