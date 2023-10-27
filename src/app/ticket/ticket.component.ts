import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import emailjs from '@emailjs/browser';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedDataService } from '../shared-data.service';
import {  NavigationEnd } from '@angular/router';
import { BusService } from '../bus.service';
import { state } from '@angular/animations';
import { DataService } from '../data.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { AppStateService } from '../app-state.service';

import { FormDataService } from '../form-data.service';
// import { FormBuilder, FormControl} from '@angular/forms';
import { SearchDataService } from '../search-data.service';
import { NewDataService } from '../new-data-service.service';
// import { SharedDataService } from '../shared-data.service';
// import { BusService } from '../bus.service';
// import {  NavigationEnd } from '@angular/router';
// import { DataService } from '../data.service';
interface Bus {
  charges: number;
  BusName: string;
  source: string;
  destination: string;
  departureTime: string;
  departureDate: string;
  busId: number;
  firstACSeats: number;
  secondACSeats: number;
  sleeperSeats: number;
  firstACPrice: number;
  secondACPrice: number;
  sleeperPrice: number;
  total: number;
  availableFirstACSeats: number;
  [key: string]: any;
}


@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrls: ['./ticket.component.css']
})
export class ticketComponent implements OnInit {
  BusId:number=0;
  source: string = '';
  destination: string = '';
  departureDate: string = '';
  departureTime: string = '';
  BusName: string = '';
  FirstAC: string='';
  SecondAC:string='';
  Sleeper:string='';
  Total:string='';
  showViewBuses: boolean = true; 
  istransactionsuccessful:Boolean | undefined;
  showEmailForm: boolean = false;
 
  // showViewBuses: boolean = true; 
  // BusName = '';
  // source = '';
  // BusId = '';
  // destination = '';
  // departureDate: string = new Date().toISOString().split('T')[0]; 
  // departureTime: string = '';
  showBusDetails: boolean = true;
  totalAmount = '';
  buses: Bus[] = [];
  filteredBuses: any[] = [];
  sourceSuggestions: string[] = [];
  destinationSuggestions: string[] = [];
  chargesSort: string = 'all';
  departureTimesort: string = 'all';
  firstACSort: string = 'all';
  // form!: FormGroup;
  showAllBuses: boolean = true;
 
  filteredBusesData: Bus[] = [];
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
  departureDateISOString: string = ''; // Store the departure date in ISO format
  departureDateFormatted: string = ''; // Store the departure date in "day month year" format

  IsAdmin!: boolean;
  IsCustomer!: boolean;
  id: any;
  selectedSeats: {
    firstACSeats: number;
    secondACSeats: number;
    sleeperSeats: number;
    [key: string]: number;
  } = {
    firstACSeats: 0,
    secondACSeats: 0,
    sleeperSeats: 0,
  };
  
  selectedFirstAC: number = 0;
  selectedSecondAC: number = 0;
  selectedSleeper: number = 0;

  
  // ...
  
  // Access selectedSecondAC through selectedSeats
  // const secondACValue = this.selectedSeats.secondACSeats;
  // ...
  
  // selectedFirstAC: number = 0;

  // selectedSecondAC: number = 0;
  // selectedSleeper: number = 0;
  
  users!: User[];
form: FormGroup= this.fb.group(
  {
    from_name:'',
    to_name:'Admin',
    from_email:'',
    subject:'',
    message:''
  }
);
  NumberOfSeats: any;
  // BusId: any;


async send()
{
  emailjs.init('vhe9A_Btiau2oX7HE');
 let response = await emailjs.send("service_dql54wq","template_3vtxojd",{
  // from_name: this.form.value.from_name,
  busName: this.busName,
    departureDate: this.departureDate,
    departureTime: this.departureTime,
    source: this.source, // Add the source value here
    destination: this.destination, // Add the destination value here
    totalAmount: this.totalAmount, // Add the total amount value here
    from_email: this.form.value.from_email,

    });
    alert("message has been sent.");
    this.form.reset();
}


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient,private fb:FormBuilder,private sharedDataService: SharedDataService,private busService: BusService,
    private userService:UserService, private appStateService: AppStateService,
    private formBuilder: FormBuilder, private searchDataService: SearchDataService,
    private newDataService: NewDataService,private dataservice:DataService,private http:HttpClient
  ) {
    this.showViewBuses = false; // Ensure it's hidden when navigating to the ticket page
    
   
     
  }
  
  hideViewBusesComponent() {
    this.showViewBuses = false;
  }
  Bus:any;
  // selectedBus: Bus = {} as Bus; 

  selectedBus: Bus | undefined = undefined;
  
  downloadTicket(): void {
    console.log('Download Ticket button clicked');
    const doc = new jsPDF();
    // doc.text(`busId: ${this.BusId}`, 20, 20);
    doc.text(`Source: ${this.source}`, 20, 20);
    doc.text(`Destination: ${this.destination}`, 20, 30);
    doc.text(`Departure Date: ${this.departureDate}`, 20, 40);
    doc.text(`Departure Time: ${this.departureTime}`, 20, 50);
    doc.text(`bus Name: ${this.busName}`, 20, 60);
    // doc.text(`Total: ${this.totalAmount}`, 20, 110);
    // doc.save('ticket.pdf');
    if (this.selectedSeats.firstACSeats > 0) {
      doc.text(`First AC Seats: ${this.selectedSeats.firstACSeats}`, 30, 90);
    }
  
    if (this.selectedSeats.secondACSeats > 0) {
      doc.text(`Second AC Seats: ${this.selectedSeats.secondACSeats}`, 30, 100);
    }
  
    if (this.selectedSeats.sleeperSeats > 0) {
      doc.text(`Sleeper Seats: ${this.selectedSeats.sleeperSeats}`, 30, 110);
    }
  
    doc.text(`Total: ${this.totalAmount}`, 20, 120);
    doc.save('ticket.pdf');
    this.showEmailForm = true;
  }
  toggleEmailForm() {
    this.showEmailForm = !this.showEmailForm;
  }
  bankName: any;
  cardNumber: any;
  ExpiryDate: string = '';
  ybl: any;

  showSuccessMessage: boolean = false;

  submitBankDetails() {
    const bankCredData = {
      userId: 123, // Replace with the actual user ID
      bankName: this.bankName,
      cardNumber: this.cardNumber,
      ExpiryDate: this.ExpiryDate, // Use ExpiryDate directly
      isActive: true, // Set the status as needed
      ybl: this.ybl
    };
    

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

   istransactionsuccessful:Boolean;
    this.httpClient
      .post('https://localhost:44331/api/bankcreds', bankCredData, { headers })
      .subscribe(
        (response) => {
          console.log('Bank card data sent:', response);
          this.istransactionsuccessful=true;
          this.showSuccessMessage = true; // Show success message after submitting
          
        },
        (error) => {
          console.error('Error sending bank card data:', error);
          this.istransactionsuccessful=false;
        }
      );
      const ticketData = {
        FirstAcSeats : this.selectedSeats.firstACSeats,
        SecondAcSeats : this.selectedSeats.secondACSeats,
        SleeperSeats : this.selectedSeats.sleeperSeats,
        // TypeofSeats: this.selectedSeats.,
        BusId: this.BusId,
        BusName: this.BusName,
        DepartureDate: this.departureDate,// Set the status as needed
        DepartureTime: this. departureTime
      };
      this.httpClient
      .post('https://localhost:44331/api/bookedTickets', ticketData, { headers })
      .subscribe(
        (response) => {
          console.log('ticket data sent:', response);
          // this.istransactionsuccessful=true;
          // this.showSuccessMessage = true; // Show success message after submitting
          
        },
        (error) => {
          console.error('Error sending ticket data:', error);
          // this.istransactionsuccessful=false;
        }
      );

  }

 
 
 
  navigateBackToViewTicket() {
    // Create ticket data to share
    const ticketData = {
      ticketNumber: '12345',
      passengerName: 'John Doe',
      departureDate: '2023-10-15',
      seatNumber: 'A1',
      // Add more properties as needed
    };
    this.sharedDataService.setSharedData(ticketData);

    // Navigate back to ViewticketComponent
    this.router.navigate(['/viewticket']); 
  }

  goBackToSearch(){ 
    // this.busService.notifyBuslistToHideViewBuses();
    console.trace(); // Add this line to trace the call stack
  this.busService.hideViewBuses();
  this.showViewBuses = false; // Set it to false to hide the content
  console.log('showViewBuses is now:', this.showViewBuses);
  console.log('navigated');
  this.showViewBuses = false;
    this.router.navigate(['/search'], {
      queryParams:{source: this.source, destination: this.destination, departureDate:this.departureDate
      
      },state: { hideViewBuses: true } 
    });
    console.log(this.source); 
  }



  navigateToTicket() {
    this.router.navigate(['/ticket']); // 
  }
  submitBankAndBookingDetails() {
  const bankCredData = {
    userId: 123, // Replace with the actual user ID
    bankName: this.bankName,
    cardNumber: this.cardNumber,
    isActive: true // Set the status as needed
  };

  const bookingData = {
    UserName: this.source, // Replace with the actual user name
    BusName: this.BusName,
    ContactNo: '1234567890', // Replace with the actual contact number
    Source: this.source,
    Destination: this.destination,
    DepartureDate: this.departureDate, //this ane var yekkadaina use cheyachu kadha app motham lo?ok
    DepartureTime: this.departureTime,
    // charges: parseInt(this.charges),
    FirstAC: this.FirstAC,
    SecondAC: this.SecondAC,
    Sleeper: this.Sleeper,
    Total: this.Total,
  };

  // Send bank and booking details to the server
  this.httpClient.post('https://localhost:44331/api/bankcreds', bankCredData, {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }).subscribe(
    (bankResponse) => {
      console.log('Bank card data sent:', bankResponse);

      // After bank response, save booking details
      this.httpClient.post('https://localhost:44331/api/bookdetails', bookingData, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).subscribe(
        (bookingResponse) => {
          console.log('Booking data sent:', bookingResponse);
          this.showSuccessMessage = true; // Show success message after submitting
        },
        (bookingError) => {
          console.error('Error sending booking data:', bookingError);
        }
      );

    },
    (bankError) => {
      console.error('Error sending bank card data:', bankError);
    }
  );
}
 seat()
 {
  this.router.navigate(['/selectseat']); //dheeni functionality cheppu
 }

  // selectedSeats: {
  //   firstACSeats: number;
  //   secondACSeats: number;
  //   sleeperSeats: number;
  // } = {
  //   firstACSeats: 0,
  //   secondACSeats: 0,
  //   sleeperSeats: 0
  // };

  charges: number = 0;

  // busName: string = '';
  // totalAmount: number = 0;


  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/search') {
          this.showViewBuses = false; // Hide the app-viewbuses component
        } else {
          this.showViewBuses = false; // Show the app-viewbuses component for other routes
        }
      }
    });
    this.filteredBuses = this.busService.getFilteredBuses();
    this.route.queryParams.subscribe(queryParams => {
      this.selectedFirstAC = queryParams['selectedFirstACSeats'] || 0;
      this.selectedSecondAC = queryParams['selectedSecondACSeats'] || 0;
      this.selectedSleeper = queryParams['selectedSleeperSeats'] || 0;
     this.source = queryParams['source'] || '';
      this.destination = queryParams['destination'] || '';
      this.departureDate = queryParams['departureDate'] || ''; 
      this.departureTime = queryParams['departureTime'] || '';
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
 
this.userService.getAll().subscribe((data: User[])=>{
  this.users = data;
  console.log(this.users);

})
this.dataservice.sendGetRequest().subscribe((data: any)=>{
  console.log(data);
  this.Bus= data;
}) 

    this.route.paramMap.subscribe((params) => {
      const state = window.history.state;

      if (state) {
        this.source = state.source;
        this.destination = state.destination;
        this.departureDate = state.departureDate;
        this.departureTime = state.departureTime;
        this.busName = state.busName;
        this.totalAmount = state.totalAmount;
        this.BusId = state.BusId;
        this.selectedSeats.firstACSeats = state.selectedFirstACSeats;
        this.selectedSeats.secondACSeats = state.selectedSecondACSeats;
        this.selectedSeats.sleeperSeats = state.selectedSleeperSeats;
      }
    });
  }


  
  
  loadBusDetails(): void {
    this.http.get<Bus[]>('https://localhost:44331/api/BusDetails').subscribe((buses: Bus[]) => {
      this.buses = buses; 
      // Initialize other properties like maxFirstACSeats, maxSecondACSeats, etc. service lekunda yela chesaru
    });
  }
  
 
    
  // selectedBus: Bus | undefined = undefined;

  // Define a dictionary to store selected seat information for each bus
  // selectedSeats: { [busId: string]: { selectedFirstAC: number, selectedSecondAC: number, selectedSleeper: number } } = {};

  bookSeats(bus: Bus): void {
    const selectedInfo = {
      selectedFirstAC: this.selectedFirstAC,
      selectedSecondAC: this.selectedSecondAC,
      selectedSleeper: this.selectedSleeper
    };
  
    // Check if at least one seat is selected
    // if (
    //   selectedInfo.selectedFirstAC === 0 &&
    //   selectedInfo.selectedSecondAC === 0 &&
    //   selectedInfo.selectedSleeper === 0
    // ) {
    //   alert('Please select at least one seat.');
    //   return;
    // }
  
    // Confirm the tickets
    this.ticketConfirmed = true;
    const busId = 123; // Replace with the actual busId
    // const selectedSeats = {
    //   selectedFirstAC: selectedInfo.selectedFirstAC,
    //   selectedSecondAC: selectedInfo.selectedSecondAC,
    //   selectedSleeper: selectedInfo.selectedSleeper,
    // };
  
    // this.busService.setSelectedSeats(busId, selectedSeats);
    // Further logic here...
  }
  
  
  

  fetchSeatDetails(busId: number, selectedInfo: any) {
    // Fetch the bus details
    this.http.get<Bus>(`https://localhost:44331/api/BusDetails/${busId}`).subscribe(
      (response) => {
        console.log('Fetched Seat details', response);

        const availableSeats = {
          firstAC: response['firstAC'],
          secondAC: response['secondAC'],
          sleeper: response['sleeper'],
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





}









