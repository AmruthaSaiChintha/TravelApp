// pro.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProService {
  private searchData = new BehaviorSubject<any>({});

  constructor() { }

  setSearchData(data: any) {
    this.searchData.next(data);
  }

  getSearchData() {
    return this.searchData.asObservable();
  }
}
