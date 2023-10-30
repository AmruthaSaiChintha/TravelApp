import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuslistComponent } from './buslist.component';

describe('BuslistComponent', () => {
  let component: BuslistComponent;
  let fixture: ComponentFixture<BuslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuslistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
