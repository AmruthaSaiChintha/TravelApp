import { Component } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './Admin.component.html',
  styleUrls: ['./Admin.component.css']
})
export class AdminComponent {
  user: string = '';
  pass: string = '';
  IsLoggedIn: boolean = false;
  showError: boolean = false; // Added showError property

  constructor() {}

  Admin(): void {
    if (this.user === 'admin' && this.pass === 'password') {
      // Successful login
      //  alert('');
      // Redirect to admin page
      window.location.href = "/adminDashboard";
      // ...
    } else {
      // Invalid login
      this.showError = true; // Show the error message
    }
    // Clear form fields
    this.user = '';
    this.pass = '';
  }

  Logout(): void {
    localStorage.removeItem("User");
    location.href = "/Admin";
  }
}
