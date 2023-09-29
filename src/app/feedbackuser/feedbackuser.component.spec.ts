import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackuserComponent } from './feedbackuser.component';

describe('FeedbackuserComponent', () => {
  let component: FeedbackuserComponent;
  let fixture: ComponentFixture<FeedbackuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackuserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeedbackuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
