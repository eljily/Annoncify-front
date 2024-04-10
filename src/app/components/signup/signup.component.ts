import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/User';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule,InputTextModule,ButtonModule,NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  user: User = { name: '', phoneNumber: '', email: '', password: '' }; // Initialize user object with empty values
  errorMessage!: string;

  constructor(private authService: AuthService) { }

  register() {
    this.authService.registerUser(this.user)
      .subscribe(
        response => {
          console.log('User registered successfully:', response);
          if (response.message) {
            // Display the response message to the user
            console.log(response.message);
          } else {
            console.error('Response does not contain a message:', response);
          }
        },
        error => {
          console.error('Error registering user:', error.error.message);
          this.errorMessage = error.error.message;
          // Optionally, you can show an error message to the user
        }
      );
  }  
  
}
