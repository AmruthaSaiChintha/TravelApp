import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilefaceComponent } from './profileface.component';

describe('ProfilefaceComponent', () => {
  let component: ProfilefaceComponent;
  let fixture: ComponentFixture<ProfilefaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilefaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilefaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
