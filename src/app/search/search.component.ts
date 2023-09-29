import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { state } from '@angular/animations';
import { DataService } from '../data.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { AppStateService } from '../app-state.service';
// import { LocalStorageService } from '@angular/common';
import { FormDataService } from '../form-data.service';
import { FormBuilder, FormControl} from '@angular/forms';
import { SearchDataService } from '../search-data.service';
import { NewDataService } from '../new-data-service.service';




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
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class searchComponent implements OnInit {
  BusName = '';
  source = '';
  BusId = '';
  destination = '';
  departureDate: string = '';
  departureTime: string = '';
  showBusDetails: boolean = true;
  totalAmount = '';
  buses: Bus[] = [];
  filteredBuses: Bus[] = [];
  sourceSuggestions: string[] = [];
  destinationSuggestions: string[] = [];
  chargesSort: string = 'all';
  departureTimesort: string = 'all';
  firstACSort: string = 'all';
  form!: FormGroup;

  selectedFirstAC: number = 0;
  selectedSecondAC: number = 0;
  selectedSleeper: number = 0;

  firstACPrice: number = 0;
  secondACPrice: number = 0;
  sleeperPrice: number = 0;

  maxFirstACSeats: { [busId: number]: number } = {};
  maxSecondACSeats: { [busId: number]: number } = {};
  maxSleeperSeats: { [busId: number]: number } = {};
  busName: any;
  ticketConfirmed: boolean | undefined;
  userId!: number;
  IsLoggedIn!: boolean;
  IsAdmin!: boolean;
  IsCustomer!: boolean;
  id: any;
  users!: User[];
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,private dataService: DataService,private userService:UserService, private appStateService: AppStateService,private formBuilder: FormBuilder, private searchDataService: SearchDataService,private newDataService: NewDataService
  ) {}



  Bus:any;

 
  showViewBuses: boolean = false;
 

  
  ngOnInit(): void {
     // Retrieve the stored search query from local storage
     const storedSearchQuery = this.newDataService.getData('searchQuery');
     if (storedSearchQuery) {
       // Update component properties with the stored data
       this.source = storedSearchQuery.source;
       this.destination = storedSearchQuery.destination;
       this.departureDate = storedSearchQuery.departureDate;
       this.departureTime = storedSearchQuery.departureTime;
       this.busName = storedSearchQuery.busName;
       this.totalAmount = storedSearchQuery.totalAmount;
       // Update other component properties as needed
     }
    this.loadBusDetails();
    
    this.searchDataService.searchData$.subscribe((searchData) => {
      // Access and use the search data here
      console.log(searchData);
    });
    this.route.queryParams.subscribe((queryParams) => {
      // Retrieve selected buses and seats from query parameters
      this.selectedFirstAC = queryParams['selectedFirstACSeats'] || 0;
      this.selectedSecondAC = queryParams['selectedSecondACSeats'] || 0;
      this.selectedSleeper = queryParams['selectedSleeperSeats'] || 0;

      // Retrieve other data as needed
      this.source = queryParams['source'] || '';
      this.destination = queryParams['destination'] || '';
      this.departureDate = queryParams['departureDate'] || '';
      this.departureTime = queryParams['departureTime'] || '';
      this.busName = queryParams['busName'] || '';
      this.totalAmount = queryParams['totalAmount'] || 0;
    });
    this.IsLoggedIn=localStorage.getItem("User")!=null ;
    var x = localStorage.getItem("User");
   if(x){
    this.IsAdmin=JSON.parse(x).value.username=='Admin';
    // this.id=JSON.parse(x).userId;
    // console.log(this.id)
    this.IsCustomer = JSON.parse(x).value.username=='Customer';
    this.id = JSON.parse(x).value.userId;
    console.log(this.id);
    
    

 }
//  this.load();
this.userService.getAll().subscribe((data: User[])=>{
  this.users = data;
  console.log(this.users);

})
    this.dataService.sendGetRequest().subscribe((data: any)=>{
      console.log(data);
      this.Bus= data;
    }) 
    this.http.get<Bus[]>('https://localhost:44331/api/BusDetails').subscribe((buses: Bus[]) => {
      this.buses = buses;
      console.log(this.buses); //idhi kooda avatledhe mari 
      buses.forEach((bus) => {
        // Initialize selected seat counts for each bus
        this.selectedSeats[bus.busId] = { selectedFirstAC: 0, selectedSecondAC: 0, selectedSleeper: 0 };

        this.maxFirstACSeats[bus.busId] = bus.availableFirstACSeats;
        this.maxSecondACSeats[bus.busId] = bus['availableSecondACSeats'];
        this.maxSleeperSeats[bus.busId] = bus['availableSleeperSeats'];
      });
    });
  }
  loadBusDetails(): void {
    this.http.get<Bus[]>('https://localhost:44331/api/BusDetails').subscribe((buses: Bus[]) => {
      this.buses = buses; //idhi? 
      // Initialize other properties like maxFirstACSeats, maxSecondACSeats, etc.
    });
  }

  getMaxSeats(seatType: string, bus: Bus): number {
    return bus[seatType] ? parseInt(bus[seatType], 10) : 0;
  }

  sortBusesByFirstACPriceLowToHigh(): void {
    this.filteredBuses.sort((a, b) => {
      if (!a.firstACPrice || !b.firstACPrice) {
        return 0;
      }
      return a.firstACPrice - b.firstACPrice;
    });
  }

  sortBusesByFirstACPriceHighToLow(): void {
    this.filteredBuses.sort((a, b) => {
      if (!a.firstACPrice || !b.firstACPrice) {
        return 0;
      }
      return b.firstACPrice - a.firstACPrice;
    });
  }

  sortBuses(): void {
    if (this.chargesSort === 'lowToHigh') {
      this.sortBusesByFirstACPriceLowToHigh();
    } else if (this.chargesSort === 'highToLow') {
      this.sortBusesByFirstACPriceHighToLow();
    } else {
      // Default to sorting by price (all)
      this.sortBusesByFirstACPriceLowToHigh();
    }
  }

  sortBuse(): void {
    if (this.departureTimesort === 'AM') {
      this.filteredBuses = this.filteredBuses.filter(bus => bus.departureTime.includes('AM'));
    } else if (this.departureTimesort === 'PM') {
      this.filteredBuses = this.filteredBuses.filter(bus => bus.departureTime.includes('PM'));
    }
  }
  

  sortBusesByTimeAMToPM(): void {
    this.filteredBuses.sort((a, b) => {
      const timeA = this.convertTo24HourFormat(a.departureTime);
      const timeB = this.convertTo24HourFormat(b.departureTime);
      return timeA.localeCompare(timeB);
    });
  }
  
  sortBusesByTimePMToAM(): void {
    this.filteredBuses.sort((a, b) => {
      const timeA = this.convertTo24HourFormat(a.departureTime);
      const timeB = this.convertTo24HourFormat(b.departureTime);
      return timeB.localeCompare(timeA);
    });
  }

  convertTo24HourFormat(time: string): string {
    const [timePart, amPmPart] = time.split(' ');
    const [hours, minutes] = timePart.split(':');
    let hour = parseInt(hours, 10);

    if (amPmPart === 'PM' && hour < 12) {
      hour += 12;
    } else if (amPmPart === 'AM' && hour === 12) {
      hour = 0;
    }

    const hourStr = hour.toString().padStart(2, '0');
    const minuteStr = minutes.padStart(2, '0');

    return `${hourStr}:${minuteStr}`;
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
  filterBuses(): void {
    console.log('Filtering Buses with Parameters:');
    console.log('Source:', this.source);
    console.log('Destination:', this.destination);
    console.log('Departure Date:', this.departureDate);
    console.log('Departure Time:', this.departureTime);
    console.log('Bus Name:', this.BusName);
  
    this.filteredBuses = this.buses.filter((bus) => {
      const selectedDepartureDate = this.parseDate(this.departureDate);
      const busDepartureDate = this.parseDate(bus.departureDate);
  
      const isMatch =
        bus.source.toLowerCase().includes(this.source.toLowerCase()) &&
        bus.destination.toLowerCase().includes(this.destination.toLowerCase()) &&
        selectedDepartureDate.toDateString() === busDepartureDate.toDateString() &&
        (this.departureTime === '' || bus.departureTime.includes(this.departureTime)) &&
        (this.BusName === '' || bus.busName.toLowerCase().includes(this.BusName.toLowerCase()));
  
      if (isMatch) {
        console.log('Matched Bus:', bus);
      }
  
      return isMatch;
    });
  
    console.log('Filtered Buses:', this.filteredBuses);
  }
  
  searchBuses(): void {
    this.searchDataService.setSearchData({
      source: this.source,
      destination: this.destination,
      departureDate: this.departureDate,
      departureTime: this.departureTime,
      busName: this.busName,
      totalAmount: this.totalAmount,
      // Add other properties as needed
    });
    this.filteredBuses = this.buses.filter((bus) => {
      const selectedDepartureDate = this.parseDate(this.departureDate);
      const busDepartureDate = this.parseDate(bus.departureDate);

      return (
        bus.source.toLowerCase().includes(this.source.toLowerCase()) &&
        bus.destination.toLowerCase().includes(this.destination.toLowerCase()) &&
        selectedDepartureDate.toDateString() === busDepartureDate.toDateString()
      );
    });
    const searchQuery = {
      source: this.source,
      destination: this.destination,
      departureDate: this.departureDate,
      departureTime: this.departureTime,
      busName: this.busName,
      totalAmount: this.totalAmount,
      // Add other properties as needed
    };
    this.newDataService.setData('searchQuery', searchQuery);
    // Sort buses based on AM/PM after filtering
    this.sortBuse();
    this.appStateService.setSearchData({
      source: this.source,
      destination: this.destination,
      departureDate: this.departureDate,
      departureTime: this.departureTime,
      busName: this.busName,
      totalAmount: this.totalAmount
      // Add other properties as needed
    });

    if (this.filteredBuses.length === 0) {
      alert('No buses found for this route and date!');
    }

    this.showBusDetails = true;

    // Log the search information and details
    console.log('Search Information:');
    // console.log('Source:', this.source);
    console.log('Destination:', this.destination);
    console.log('Departure Date:', this.departureDate);
    console.log('Departure Time:', this.departureTime);
    console.log('Bus Name:', this.busName);
    console.log('Total Amount:', this.totalAmount);
  //ivi p

    console.log('Filtered Buses:', this.filteredBuses);
  }


  bookSeats(bus: Bus): void {
    const selectedInfo = this.selectedSeats[bus.busId];

    // Check if at least one seat is selected
    if (
      selectedInfo.selectedFirstAC === 0 &&
      selectedInfo.selectedSecondAC === 0 &&
      selectedInfo.selectedSleeper === 0
    ) {
      alert('Please select at least one seat.');
      return;
    }

    // Confirm the tickets
    this.ticketConfirmed = true;

    // You can also add any additional logic here for ticket booking if needed.

    // Fetch seat details and update available seats
    this.fetchSeatDetails(bus.busId, selectedInfo);
  }

  calculateTotalPrice(bus: Bus): number {
    const selectedSeats = this.selectedSeats[bus.busId];
    const firstACPricePerSeat = bus.firstACPrice ? bus.firstACPrice : 0;
    const secondACPricePerSeat = bus.secondACPrice ? bus.secondACPrice : 0;
    const sleeperPricePerSeat = bus.sleeperPrice ? bus.sleeperPrice : 0;

    const totalPrice =
      selectedSeats.selectedFirstAC * firstACPricePerSeat +
      selectedSeats.selectedSecondAC * secondACPricePerSeat +
      selectedSeats.selectedSleeper * sleeperPricePerSeat;

    return totalPrice;
  }

  selectedBus: Bus | undefined = undefined;

  // Define a dictionary to store selected seat information for each bus
  selectedSeats: { [busId: string]: { selectedFirstAC: number, selectedSecondAC: number, selectedSleeper: number } } = {};

  // Function to check if the "Book Seats" button should be disabled
  isBookSeatsDisabled(bus: any): boolean {
    const selectedInfo = this.selectedSeats[bus.busId];
    return (
      !selectedInfo || // Disable if no seat is selected
      (selectedInfo.selectedFirstAC === 0 && selectedInfo.selectedSecondAC === 0 && selectedInfo.selectedSleeper === 0)
    );
  }

  submit() {
    console.log('Form Values:', this.form.value);
    this.http.post('https://localhost:44331/api/Booking/', this.form.value).subscribe(
      (response) => {
        console.log('Request was successful', response);
        console.log(this.source);
        // After successful booking, fetch current available seats

      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  fetchSeatDetails(busId: number, selectedInfo: any) {
    // Fetch the bus details
    this.http.get<Bus>(`https://localhost:44331/api/BusDetails/${busId}`).subscribe(
      (response) => {
        console.log('Fetched Seat details', response);

        const availableSeats = {
          firstAC: response.firstAC,
          secondAC: response.secondAC,
          sleeper: response.sleeper,
        };

        // Calculate the updated available seats
        const updatedSeats = {
          firstAC: availableSeats.firstAC - selectedInfo.selectedFirstAC,
          secondAC: availableSeats.secondAC - selectedInfo.selectedSecondAC,
          sleeper: availableSeats.sleeper - selectedInfo.selectedSleeper,
        };

        console.log('Remaining Seats:', updatedSeats);

        // Update the remaining seats
        this.updateAvailableSeats(busId, updatedSeats);
      },
      (error) => {
        console.error('Failed to fetch seat details:', error);
        // Log the error response for further investigation
        console.error('Error Response:', error.error);
      }
    );
  }

  updateAvailableSeats(busId: number, updatedSeats: any) {
    console.log('updateAvailableSeats method called');
    console.log(updatedSeats);

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    this.http.put(`https://localhost:44331/api/BusDetails/update-seats/${busId}`, updatedSeats, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })

      .subscribe((res) => {
        console.log(res);
      },
      (err) => {
        console.log("Error:", err)
      });

  }

  showBusInfo(bus: Bus): void { //
    if (bus) {
      this.selectedBus = bus;
      const totalPrice = this.calculateTotalPrice(bus);
      console.log(this.source);
      this.router.navigate(['/ticket'], {
        state: {
          selectedFirstACSeats: this.selectedSeats[bus.busId].selectedFirstAC,
          selectedSecondACSeats: this.selectedSeats[bus.busId].selectedSecondAC,
          selectedSleeperSeats: this.selectedSeats[bus.busId].selectedSleeper,
          departureDate: bus.departureDate,
          departureTime: bus.departureTime,
          BusId: bus.busId,
          busName: bus.busName,
          charges: bus.charges,
          source: this.source,
          destination: this.destination,
          totalAmount: totalPrice, //intha intha code yevar rayamnaar ba
          // Add other details you want to pass here
        },
      });

      // Log the selected bus information
      console.log('Selected Bus Information:');
      console.log('Bus Name:', bus.busName);
      console.log('Departure Date:', bus.departureDate);
      console.log('Departure Time:', bus.departureTime); //ivaa print ayyevi? ante busvar lo save ayyinatle kadha aa values kani neeku 
      //ikkada source and destination and date unte chalu aa page lo ki ee values ela use cheyalo telsa?  matrame kavali
      console.log('Charges:', bus.charges);
      console.log('Source:', this.source);
      console.log('Destination:', this.destination);
      console.log('Total Amount:', totalPrice);
    } else {
      console.error('No bus selected.');
    }
  }
    
  isSelectSeatDisabled(bus: Bus): boolean {
    const selectedInfo = this.selectedSeats[bus.busId];
    const availableFirstACSeats = this.getMaxSeats('firstAC', bus);
    const availableSecondACSeats = this.getMaxSeats('secondAC', bus);
    const availableSleeperSeats = this.getMaxSeats('sleeper', bus);
  
    console.log('selectedInfo', selectedInfo);
    console.log('availableFirstACSeats', availableFirstACSeats);
    console.log('availableSecondACSeats', availableSecondACSeats);
    console.log('availableSleeperSeats', availableSleeperSeats);
  
    return (
      selectedInfo.selectedFirstAC === null ||
      selectedInfo.selectedSecondAC === null ||
      selectedInfo.selectedSleeper === null ||
      selectedInfo.selectedFirstAC > availableFirstACSeats ||
      selectedInfo.selectedSecondAC > availableSecondACSeats ||
      selectedInfo.selectedSleeper > availableSleeperSeats ||
      (selectedInfo.selectedFirstAC === 0 && selectedInfo.selectedSecondAC === 0 && selectedInfo.selectedSleeper === 0)
    );
  }
  
  


  navigateToTicket(selectedBus: Bus): void {
    const totalPrice = this.calculateTotalPrice(selectedBus);
  
    this.router.navigate(['/ticket'], {
      state: {
        selectedFirstACSeats: this.selectedSeats[selectedBus.busId].selectedFirstAC,
        selectedSecondACSeats: this.selectedSeats[selectedBus.busId].selectedSecondAC,
        selectedSleeperSeats: this.selectedSeats[selectedBus.busId].selectedSleeper,
        departureDate: selectedBus.departureDate,
        departureTime: selectedBus.departureTime,
        BusId: selectedBus.busId,
        busName: selectedBus.busName,
        charges: selectedBus.charges,
        source: this.source,
        destination: this.destination,
        totalAmount: totalPrice,
        // Add other details you want to pass here
      },
    });
  }
  

}
