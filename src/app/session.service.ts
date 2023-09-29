import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private sessionData: any = {};

  constructor() {}

  setSessionData(data: any) {
    this.sessionData = data;
  }

  getSessionData() {
    return this.sessionData;
  }
}
