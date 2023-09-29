import { ComponentFixture, TestBed } from '@angular/core/testing';

import { viewbusesComponent } from './viewbuses.component';

describe('ViewbusesComponent', () => {
  let component: viewbusesComponent;
  let fixture: ComponentFixture<viewbusesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ viewbusesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(viewbusesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
