import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

interface Bus {
  charges: number;
  busName: string;
  source: string;
  busId:number;
  destination: string;
  departureTime: string;
  departureDate: string;
  [key: string]: any;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  BusName = '';
  source = '';
  destination = '';
  charges='';
  BusId='';
  departureDate: string = '';
  showBusDetails: boolean = true;
  buses: Bus[] = [];
  filteredBuses: Bus[] = [];
  selectedBus: Bus | undefined;
  sourceSuggestions: string[] = [];
  destinationSuggestions: string[] = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.http.get<Bus[]>('https://localhost:44331/api/BusDetails').subscribe((buses: Bus[]) => {
      this.buses = buses;
    });
  }

  filterSource(): void {
    this.sourceSuggestions = this.getSuggestions(this.source, 'source');
    this.showBusDetails = false;
    this.selectedBus = undefined;
  }

  filterDestination(): void {
    this.destinationSuggestions = this.getSuggestions(this.destination, 'destination');
    this.showBusDetails = false;
    this.selectedBus = undefined;
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

  parseDate(dateString: string): Date {
    const parts = dateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    return new Date(year, month, day);
  }

  searchBuses(): void {
    this.filteredBuses = this.buses.filter((bus) => {
      const selectedDepartureDate = this.parseDate(this.departureDate);
      const busDepartureDate = this.parseDate(bus.departureDate);

      return (
        bus.source.toLowerCase().includes(this.source.toLowerCase()) &&
        bus.destination.toLowerCase().includes(this.destination.toLowerCase()) &&
        selectedDepartureDate.toDateString() === busDepartureDate.toDateString()
      );
    });

    if (this.filteredBuses.length === 0) {
      alert('No buses found for this route and date!');
    }

    this.showBusDetails = true;
  }
  // bookNow(bus: Bus): void {
  //   console.log('busName before assignment:', bus.busName); 
  //   this.BusName = bus.busName; 
  //   console.log('BusName after assignment:', this.BusName);
  //   this.selectedBus = bus;
  //   this.router.navigate(['/businfo'], {
  //     relativeTo: this.route,
  //     queryParams: {
  //       busName: this.BusName, 
  //       source: this.source,
  //       destination: this.destination,
  //       departureDate: this.departureDate
  //     }
  //   });
  // }
  showBusInfo(bus: Bus): void {
    this.router.navigate(['/signup'], {
      queryParams: {
        source: this.source,
        destination: this.destination,
        departureDate: this.departureDate,
        busName: bus.busName,
        charges:bus.charges,
        BusId:bus.busId
      }
    });
  }
}



