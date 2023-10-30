import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor() {}

  // Store data in local storage
  setData(key: string, data: any): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Get data from local storage
  getData(key: string): any {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  }
}
