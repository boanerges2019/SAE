import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionMacroCommandeComponent } from './gestion-macro-commande.component';

describe('GestionMacroCommandeComponent', () => {
  let component: GestionMacroCommandeComponent;
  let fixture: ComponentFixture<GestionMacroCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionMacroCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionMacroCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
