import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeteoVhComponent } from './meteo-vh.component';

describe('MeteoVhComponent', () => {
  let component: MeteoVhComponent;
  let fixture: ComponentFixture<MeteoVhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeteoVhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeteoVhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
