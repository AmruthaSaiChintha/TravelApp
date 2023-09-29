// new-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // Provide this service at the root level
})
export class NewDataService {
  constructor() {}

  // Store data in local storage
  setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Retrieve data from local storage
  getData(key: string): any {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
  }
}
