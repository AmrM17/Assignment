// register.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  template: `
    <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
      <input 
        type="text" 
        formControlName="username" 
        placeholder="Username"
      >
      <input 
        type="password" 
        formControlName="password" 
        placeholder="Password"
      >
      <button type="submit" [disabled]="registerForm.invalid">Sign Up</button>
      
      <p *ngIf="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  `,
  styles: [`
    .error { color: red; }
    form { 
      display: flex; 
      flex-direction: column; 
      max-width: 300px; 
      margin: 0 auto; 
    }
    input, button { margin: 10px 0; }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder, 
    private userService: UserService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(1)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const success = this.userService.addUser(this.registerForm.value);
      
      if (success) {
        this.errorMessage = '';
        this.registerForm.reset();
      } else {
        this.errorMessage = 'Username already exists';
      }
    }
  }
}