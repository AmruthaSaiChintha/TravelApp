import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Bus {
  charges: number;
  busName: string;
  busId: number;
  source: string;
  destination: string;
  departureTime: string;
  departureDate: string;
  firstAC: number;
  secondAC: number;
  sleeper: number;
  firstACPrice: number;
  secondACPrice: number;
  sleeperPrice: number;
  total: number;
  availableFirstACSeats: number; // Add available seats property
  [key: string]: any;
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  buses: Bus[] = [];
  filteredBuses: Bus[] = []; // Initialize it empty initially
  source: string = '';
  destination: string = '';
  departureDate: string = '';
  showAllBuses: boolean = true; // Initialize it as true to show all buses initially

  // ... (other properties and methods)

  ngOnInit(): void {
    // Load all buses initially
    this.loadAllBuses();
    // Initialize filteredBuses with all buses initially
    this.filteredBuses = this.buses;
  }

  loadAllBuses(): void {
    this.http.get<Bus[]>('https://localhost:44331/api/BusDetails').subscribe((buses: Bus[]) => {
      this.buses = buses;
    });
  }
  constructor(private http: HttpClient) {}

  searchBuses(): void {
    // Filter buses based on source, destination, and departure date
    this.filteredBuses = this.buses.filter((bus) => {
      return (
        bus.source.toLowerCase().includes(this.source.toLowerCase()) &&
        bus.destination.toLowerCase().includes(this.destination.toLowerCase()) &&
        bus.departureDate.includes(this.departureDate)
      );
    });

    if (this.filteredBuses.length === 0) {
      alert('No buses found for this route and date!');
    }

    this.showAllBuses = false;
  }

  // ... (other methods)
}
