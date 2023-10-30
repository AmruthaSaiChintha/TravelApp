import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { aboutComponent } from './about.component';

describe('aboutComponent', () => {
  let component: aboutComponent;
  let fixture: ComponentFixture<aboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ aboutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(aboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
