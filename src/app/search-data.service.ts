import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchDataService {
  private searchDataSubject = new BehaviorSubject<any>({});
  searchData$ = this.searchDataSubject.asObservable();

  setSearchData(data: any) {
    this.searchDataSubject.next(data);
  }
}
