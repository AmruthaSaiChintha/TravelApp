// bus.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
// import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
@Injectable({
  providedIn: 'root',
})
export class BusService {
  filteredBuses: Bus[] = [];
  private selectedSeats: { [busId: number]: any } = {};
  // private hideViewBusesSubject = new Subject<void>();
  // private hideViewBusesSubject = new BehaviorSubject<boolean>(false);
  private hideViewBusesSubject = new BehaviorSubject<boolean>(false);
  hideViewBuses() {
    this.hideViewBusesSubject.next(true);
  }

  // Create a function to get the hideViewBusesSubject as an observable
  getHideViewBusesSubject() {
    return this.hideViewBusesSubject.asObservable();
  }

  setSelectedSeats(busId: number, seats: any): void {
    this.selectedSeats[busId] = seats;
  }

  getSelectedSeats(busId: number): any {
    return this.selectedSeats[busId];
  }
  notifyBuslistToHideViewBuses() {
    this.hideViewBusesSubject.next(true);
  }
  setFilteredBuses(buses: Bus[]): void {
    this.filteredBuses = buses;
  }

  getFilteredBuses(): Bus[] {
    return this.filteredBuses;
  }
}
