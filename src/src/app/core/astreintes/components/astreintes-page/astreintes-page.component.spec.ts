import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AstreintesPageComponent } from './astreintes-page.component';

describe('AstreintesPageComponent', () => {
  let component: AstreintesPageComponent;
  let fixture: ComponentFixture<AstreintesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AstreintesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AstreintesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
