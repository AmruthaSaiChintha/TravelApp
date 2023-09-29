import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';


@Component({
    selector: 'app-edit-profile',
    templateUrl: './edit-profile.component.html',
    styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
    userId!: number;
    profileForm!: FormGroup;
    showSuccessMessage: boolean = false;
    // userId!: number;
    IsLoggedIn!: boolean;
    IsAdmin!: boolean;
    IsCustomer!: boolean;
    id: any;
    users!: User[];
    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
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
    
        this.route.params.subscribe((params) => {
            this.userId = +params['userId']; // Get userId from route parameters

            this.profileForm = this.formBuilder.group({
                userId: ['', Validators.required],
                userName: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                password: ['', Validators.required],
                confirmPassword: ['', Validators.required],
                phoneNumber: ['', Validators.required]
                // Add more form controls here
            });

            // Fetch user data based on userId and populate the form
            this.fetchUserData();
        });
    }

    submitForm() {
        const formData = this.profileForm.value;
        this.userService.updateUserProfile(this.userId, formData).subscribe(
            (res) => {
                console.log("User updated successfully!", res);
                this.showSuccessMessage = true; // Show the success message
                this.router.navigate(['viewProfile', this.userId]);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    fetchUserData() {
        this.userService.getUserDetails(this.userId).subscribe((userData) => {
            this.profileForm.patchValue(userData);
        });
    }
}
