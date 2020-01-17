import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MacroCommandePageComponent } from './macro-commande-page.component';

describe('MacroCommandePageComponent', () => {
  let component: MacroCommandePageComponent;
  let fixture: ComponentFixture<MacroCommandePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MacroCommandePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MacroCommandePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
