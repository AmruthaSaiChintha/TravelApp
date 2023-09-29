import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Import HttpClient for making HTTP requests

interface Bus {
  charges: number;
  BusName: string;
  source: string;
  destination: string;
  departureTime: string;
  departureDate: string;
  id: string;
  [key: string]: any;
}

@Component({
  selector: 'app-bus-info',
  templateUrl: './bus-info.component.html',
  styleUrls: ['./bus-info.component.css']
})
export class BusInfoComponent implements OnInit {
  selectedBus: Bus | undefined;
  source: string | null = null;
  destination: string | null = null;
  departureDate: string | null = null;
  busName: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient // Inject HttpClient for making HTTP requests
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.source = params['source'] || null;
      this.destination = params['destination'] || null;
      this.departureDate = params['departureDate'] || null;
      this.busName = params['busName'] || null;
    });
  }

  fetchAndFilterBusDetails(): void {
    // Make an HTTP request to fetch bus details and filter them based on the query parameters
    // Adjust the API URL and query parameters as needed for your application
    this.http.get<Bus[]>('https://localhost:44331/api/busdetails', {
      params: {
        source: this.source || '',
        destination: this.destination || '',
        departureDate: this.departureDate || ''
      }
    }).subscribe((buses: Bus[]) => {
      // You may need to add additional filtering logic based on your requirements
      // For now, let's assume you just want the first bus in the filtered list
      if (buses && buses.length > 0) {
        this.selectedBus = buses[0];
      }
    });
  }

  bookSeat(): void {
    // Logic to book a seat for the selected bus
    // You can navigate to the booking page or perform any other action here
    // For example, navigate to the booking page with the selected bus ID
    if (this.selectedBus) {
      this.router.navigate(['/booking', this.selectedBus.id]);
    } else {
      alert('No bus selected.');
    }
  }
 
}


