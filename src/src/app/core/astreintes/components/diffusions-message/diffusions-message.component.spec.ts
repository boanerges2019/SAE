import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiffusionsMessageComponent } from './diffusions-message.component';

describe('DiffusionsMessageComponent', () => {
  let component: DiffusionsMessageComponent;
  let fixture: ComponentFixture<DiffusionsMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiffusionsMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiffusionsMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
