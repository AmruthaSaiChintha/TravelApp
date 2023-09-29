import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { booknowComponent } from './booknow.component';

describe('booknowComponent', () => {
  let component: booknowComponent;
  let fixture: ComponentFixture<booknowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ booknowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(booknowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
