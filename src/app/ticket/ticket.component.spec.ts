import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ticketComponent } from './ticket.component';

describe('ticketComponent', () => {
  let component: ticketComponent;
  let fixture: ComponentFixture<ticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ticketComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                source: 'Bangalore',
                destination: 'Chennai',
                departureDate: '2022-03-17',
                departureTime: '10:30 AM'
              }
            }
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display ticket details', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.ticket-details h2').textContent).toContain('Ticket Details');
    expect(compiled.querySelector('.ticket-details p:nth-child(1)').textContent).toContain('Bangalore');
    expect(compiled.querySelector('.ticket-details p:nth-child(2)').textContent).toContain('Chennai');
    expect(compiled.querySelector('.ticket-details p:nth-child(3)').textContent).toContain('2022-03-17');
    expect(compiled.querySelector('.ticket-details p:nth-child(4)').textContent).toContain('10:30 AM');
  });
});

