import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewfeedComponent } from './viewfeed.component';

describe('ViewfeedComponent', () => {
  let component: ViewfeedComponent;
  let fixture: ComponentFixture<ViewfeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewfeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewfeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
