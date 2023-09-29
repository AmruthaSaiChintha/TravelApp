import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Observable } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-register-users',
  templateUrl: './register-users.component.html',
  styleUrls: ['./register-users.component.css']
})
export class RegisterUsersComponent implements OnInit{
  regUsers!: Observable<User[]>;
  Users: User[] = [];
  searchText: string = ''; // Property to store the search text
  filteredUsers: User[] = []; // Property to store filtered users

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.regUsers = this.userService.getAll();

    this.regUsers.subscribe((res) => {
      this.Users = res;
      this.filteredUsers = this.Users; // Initialize filteredUsers with all users
    });
  }

  // Function to filter users based on search text
  filterUsers(): void {
    this.filteredUsers = this.Users.filter((user) =>
      user.userName.toLowerCase().includes(this.searchText.toLowerCase()) ||
      user.phoneNumber.includes(this.searchText)
    );
  }
}