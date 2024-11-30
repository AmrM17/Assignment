import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  standalone: true,
  template: `
    <ul>
      <li 
        *ngFor="let user of users" 
        [ngClass]="{
          'red-text': user.password.length < 5,
          'pointer': true
        }"
        (click)="deleteUser(user.username)"
      >
        {{ user.username }}
      </li>
    </ul>
  `,
  styles: [`
    ul { 
      list-style-type: none; 
      padding: 0; 
      max-width: 300px; 
      margin: 0 auto; 
    }
    li { 
      padding: 10px; 
      border-bottom: 1px solid #000; 
    }
    .red-text { color: red; }
    .pointer { cursor: pointer; }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.users$.subscribe(users => {
      this.users = users;
    });
  }

  deleteUser(username: string) {
    this.userService.deleteUser(username);
  }
}