import { ComponentFixture, TestBed } from '@angular/core/testing';

import { regbusesComponent } from './regbuses.component';

describe('regbusesComponent', () => {
  let component: regbusesComponent;
  let fixture: ComponentFixture<regbusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ regbusesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(regbusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
