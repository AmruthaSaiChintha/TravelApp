// map.component.ts
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  sourceLat = 19.7515;
  sourceLng = 74.4763;
  destLat = 14.6546;
  destLng = 77.5561;
  centerLat = (this.sourceLat + this.destLat) / 2;
  centerLng = (this.sourceLng + this.destLng) / 2;
  routePath: any[] = []; // Array to store the route coordinates

  constructor() {}

  ngOnInit() {
  }
}
