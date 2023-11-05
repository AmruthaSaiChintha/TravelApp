import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  hasValidationErrors: boolean = false;
  invalidPassword: boolean = false;

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}

  ngOnInit(): void {}

  get f() {
    return this.form.controls;
  }

  Login(): void {
    // Reset the validation error flags
    this.hasValidationErrors = false;
    this.invalidPassword = false;

    // Check if the form is valid
    if (this.form.invalid) {
      // If the form is invalid, do not proceed with login
      this.hasValidationErrors = true;
      return;
    }

    const email = this.form.value.email;
    const password = this.form.value.password;

    // Check for a specific email and password combination
    if (email === 'admin@gmail.com' && password === 'password') {
      // Successful login, redirect to admin dashboard
      window.location.href = '/adminDashboard';
    } else {
      // If the email and password don't match the special case, make an HTTP request to authenticate
      const param = { email, pwd: password };

      const postData = { userName: email, password: password };

      this.sendPostRequest(postData).subscribe((data) => {
        console.log(data.token);

        //if token is null means authentication failed so set either username or password as invalid
        if (!data.token) {
          this.invalidPassword = true;
          this.form.controls['password'].setErrors({ invalidPassword: true });
        } else {
          this.http
            .get<any>(
              'https://localhost:44331/api/RegisterUsers/' +
                email +
                '/' +
                password
            )
            .subscribe((data) => {
              console.log(data);

              if (data.Status === 'Error') {
                // Password is incorrect
                this.invalidPassword = true;
                this.form.controls['password'].setErrors({
                  invalidPassword: true,
                });
              } else {
                localStorage.setItem('User', JSON.stringify(data));

                if (data.value.userType === 'Admin') {
                  window.location.href = '/adminDashboard';
                } else {
                  window.location.href = '/customerDashboard';
                }
              }
            });
        }
      });
    }
  }

  sendPostRequest(data: any): Observable<any> {
    const accountAuthUrl = `https://localhost:44331/api/Accounts/GetToken`;

    const options = {
      headers: new HttpHeaders().append('Content-Type', 'application/json'),
    };

    return this.http.post<any>(accountAuthUrl, JSON.stringify(data), options);
  }
}
