import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationPrincipaleComponent } from './navigation-principale.component';

describe('NavigationPrincipaleComponent', () => {
  let component: NavigationPrincipaleComponent;
  let fixture: ComponentFixture<NavigationPrincipaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationPrincipaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationPrincipaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
