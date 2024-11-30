import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { UserListComponent } from './user-list/user-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    RegisterComponent, 
    UserListComponent
  ],
  template: `
    <div class="center-content">
      <h1>User Registration App</h1>
      <app-register></app-register>
      <app-user-list></app-user-list>
    </div>
  `,
  styles: [`
    .center-content {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh; /* Full viewport height */
      text-align: center;
    }
  `]
})
export class AppComponent {}
