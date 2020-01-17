import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulletinsPageComponent } from './bulletins-page.component';

describe('BulletinsPageComponent', () => {
  let component: BulletinsPageComponent;
  let fixture: ComponentFixture<BulletinsPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulletinsPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulletinsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
