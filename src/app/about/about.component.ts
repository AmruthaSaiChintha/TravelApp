import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface Bus {
  charges: number;
  BusName: string;
  source: string;
  destination: string;
  departureTime: string;
  departureDate: string;
  [key: string]: any; // Adding an index signature
}
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class aboutComponent implements OnInit{


  source = '';
  destination = '';
  buses: Bus[] = [];
  filteredBuses: Bus[] = [];
  selectedBus: Bus | undefined;
  sourceSuggestions: string[] = [];
  destinationSuggestions: string[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.get<Bus[]>('https://localhost:44365/api/BusDetails').subscribe((buses: Bus[]) => {
      this.buses = buses;
    });
  }

  filterSource(): void {
    this.sourceSuggestions = this.getSuggestions(this.source, 'source');
  }

  filterDestination(): void {
    this.destinationSuggestions = this.getSuggestions(this.destination, 'destination');
  }

  getSuggestions(query: string, type: string): string[] {
    query = query.toLowerCase();
    const suggestions = this.buses.map(bus => bus[type]);
    return suggestions.filter(suggestion => suggestion.toLowerCase().includes(query));
  }

  selectSuggestion(type: string, suggestion: string): void {
    if (type === 'source') {
      this.source = suggestion;
      this.sourceSuggestions = [];
    } else if (type === 'destination') {
      this.destination = suggestion;
      this.destinationSuggestions = [];
    }
  }

  searchBuses(): void {
    this.filteredBuses = this.buses.filter((bus) => {
      return bus.source.toLowerCase().includes(this.source.toLowerCase()) && bus.destination.toLowerCase().includes(this.destination.toLowerCase());
    });

    if (this.filteredBuses.length === 0) {
      alert('No buses found for this route!');
    }
  }

  continueWith(bus: Bus): void {
    this.selectedBus = bus;
    this.bookNow();
  }

  bookNow(): void {
    if (!this.selectedBus) {
      alert('Please select a bus to book!');
      return;
    }

    this.router.navigate(['/ticket'], {
      state: {
        source: this.selectedBus.source,
        destination: this.selectedBus.destination,
        BusName: this.selectedBus.BusName,
        departureDate: this.selectedBus.departureDate,
        departureTime: this.selectedBus.departureTime,
        charges: this.selectedBus.charges,
      }
    });
  }
}
