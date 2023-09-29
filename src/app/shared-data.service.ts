import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private searchState: any; // Define a private variable to store shared state

  constructor() {}

  // Method to set the shared state
  setSearchState(state: any): void {
    this.searchState = state;
  }

  // Method to get the shared state
  getSearchState(): any {
    return this.searchState;
  }
}
