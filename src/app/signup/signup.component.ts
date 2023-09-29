import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const phoneNumberPattern = /^[0-9]{10}$/; // Pattern for 10-digit phone number
const userNamePattern = /^[a-zA-Z]+$/; // Pattern for alphabets-only username

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  showAlert = false;
  emailExists = false;

  constructor(
    public userService: UserService,
    public fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      userName: ['', [Validators.required, Validators.pattern(userNamePattern)]],
      email: ['', [Validators.required, Validators.pattern(emailPattern)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phoneNumber: [
        '',
        [Validators.required, Validators.pattern(phoneNumberPattern)]
      ],
    });

    this.form.valueChanges.subscribe(() => {
      this.showAlert = false;
    });
  }

  get f() {
    return this.form.controls;
  }

  checkEmail() {
    const email = this.form!.get('email')!.value;

    if (email) {
      console.log(`Checking email existence for: ${email}`);
      this.userService.checkEmailExists(email).subscribe((exists) => {
        console.log(`Email exists: ${exists}`);
        this.emailExists = exists;
      });
    }
  }

  submit() {
    Object.keys(this.form.controls).forEach((controlName) => {
      this.form.get(controlName)?.markAsTouched();
    });

    if (this.form.valid) {
      if (this.form.value.password !== this.form.value.confirmPassword) {
        alert('Password and Confirm Password must be the same!');
      } else if (this.emailExists) {
        alert('Email already exists. Please use a different email.');
      } else {
        // Proceed with registration
        this.userService.create(this.form.value).subscribe(
          (res) => {
            console.log('Account signed up successfully!');
            this.router.navigate(['/login']);
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
      }
      this.showAlert = false;
    } else {
      this.showAlert = true;
    }
  }
}
