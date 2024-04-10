import { Component } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule,ButtonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  phoneNumber!: string;
  password!: string;
  errorMessage!: string;

  constructor(private router: Router) { }

  login() {
    // Here you can implement your authentication logic
    // For demonstration purposes, let's just redirect to a different page
    this.router.navigate(['/products']);
  }
}
