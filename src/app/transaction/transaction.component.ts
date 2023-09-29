import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  bankName: any;
  cardNumber: any;
  showSuccessMessage: boolean | undefined;
  source: string = '';
  destination: string = '';
  departureDate: string = '';
  departureTime: string = '';
  BusName: string = '';
  charges: string = '';

  constructor(
    private httpClient: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    // Fetch bus details from the API
    try {
      const busDetailsResponse = await this.httpClient.get<any>(
        'https://localhost:44365/api/BusDetails/' + this.BusName
      ).toPromise();
      
      // Extract bus details from the response
      const busDetails = busDetailsResponse as any;

      // Assign bus details to properties
      this.source = busDetails.source;
      this.destination = busDetails.destination;
      this.departureDate = busDetails.departureDate;
      this.departureTime = busDetails.departureTime;
      // Assign other bus details as needed
    } catch (error) {
      console.error('Error fetching bus details:', error);
    }
  }

  submitBankDetails() {
    // Prepare the data to be sent to the API
    const bankCredData = {
      userId: 123, // Replace with the actual user ID
      bankName: this.bankName,
      cardNumber: this.cardNumber,
      isActive: true // Set the status as needed
    };

    // Send the bank card data to the API
    this.httpClient.post('https://localhost:44365/api/bankcreds', bankCredData, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).subscribe(
      (response) => {
        console.log('Bank card data sent:', response);
        this.showSuccessMessage = true; // Show success message after submitting

        // You can optionally call the function to fetch and assign bus details here
        // this.fetchAndAssignBusDetails();
      },
      (error) => {
        console.error('Error sending bank card data:', error);
      }
    );
  }

  // Function to fetch and assign bus details (similar to ngOnInit's functionality)
  async fetchAndAssignBusDetails() {
    try {
      // ... (same code as in ngOnInit)
    } catch (error) {
      console.error('Error fetching bus details:', error);
    }
  }

  // Inside the downloadTicket function
// Inside the downloadTicket function
downloadTicket() {
  // After clicking on the "Download Ticket" button, navigate to the journey component
  this.router.navigate(['/ticket']); // Adjust the route according to your configuration
}

}


