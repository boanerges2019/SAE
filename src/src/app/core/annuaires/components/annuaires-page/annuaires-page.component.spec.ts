import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnuairePageComponent } from './annuaire-page.component';

describe('AnnuairePageComponent', () => {
  let component: AnnuairePageComponent;
  let fixture: ComponentFixture<AnnuairePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnuairePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnuairePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
