import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeatinfoComponent } from './seatinfo.component';

describe('SeatinfoComponent', () => {
  let component: SeatinfoComponent;
  let fixture: ComponentFixture<SeatinfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeatinfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeatinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
