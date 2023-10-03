import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BusService } from '../bus.service';
import { Subscription } from 'rxjs'; // Import Subscription
import { SharedDataService } from '../shared-data.service';
// import { BusService } from '../bus.service'; 



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
  selector: 'app-buslist',
  templateUrl: './buslist.component.html',
  styleUrls: ['./buslist.component.css']
})
export class BuslistComponent implements OnInit, OnDestroy {
  showViewBuses: boolean = true;
  filteredBuses: Bus[] = [];
  private hideViewBusesSubscription: Subscription = new Subscription();

  constructor(private busService: BusService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/buslist') {
          this.showViewBuses = false;
        }
      }
    });
  }

  ngOnInit(): void {
    const currentUrl = this.router.url;
    console.log('Current URL:', currentUrl);
    if(currentUrl.includes("source")&&currentUrl.includes("destination"))
    {
      this.showViewBuses = false;
    }
    // Initialize filteredBuses and subscribe to hideViewBusesSubject
    this.filteredBuses = this.busService.getFilteredBuses();
    this.hideViewBusesSubscription = this.busService.getHideViewBusesSubject().subscribe(() => {
      this.showViewBuses = false;
    });
  }

  ngOnDestroy() {
    // Unsubscribe from the subscription to prevent memory leaks
    this.hideViewBusesSubscription.unsubscribe();
  }
}







