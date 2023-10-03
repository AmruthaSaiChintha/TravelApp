import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import emailjs from '@emailjs/browser';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SharedDataService } from '../shared-data.service';
import {  NavigationEnd } from '@angular/router';
import { BusService } from '../bus.service';
interface Bus {
  charges: number;
  BusName: string;
  source: string;
  destination: string;
  departureTime: string;
  departureDate: string;
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
  selectedFirstAC: number = 0;
  selectedSecondAC: number = 0;
  selectedSleeper: number = 0;
  // showViewBuses: boolean = true; 

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
    private httpClient: HttpClient,private fb:FormBuilder,private sharedDataService: SharedDataService,private busService: BusService
  ) {
    this.showViewBuses = false; // Ensure it's hidden when navigating to the ticket page
    
    
     
  }
  
  hideViewBusesComponent() {
    this.showViewBuses = false;
  }
  
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

  selectedSeats: {
    firstACSeats: number;
    secondACSeats: number;
    sleeperSeats: number;
  } = {
    firstACSeats: 0,
    secondACSeats: 0,
    sleeperSeats: 0
  };

  charges: number = 0;

  busName: string = '';
  totalAmount: number = 0;


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


  
  









}









