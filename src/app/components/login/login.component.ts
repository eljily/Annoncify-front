import { Component } from '@angular/core';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MessageService } from 'primeng/api';

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
  messageService!: MessageService;

  constructor(private router: Router,private authService:AuthService) { }

  login() {
    // Call the login method from your authentication service
    this.authService.login(this.phoneNumber, this.password).subscribe(
      response => {
        // Handle successful login response
        console.log('Login successful:', response);
        localStorage.setItem('token', response.jwt);
        localStorage.setItem('userId', response.userId);
        this.authService.setAuthenticated(true);
        // Optionally navigate to another page
        this.router.navigate(['/profile']);
      },
      error => {
        // Handle login error
        console.error('Login failed:', error);
        this.messageService.add({severity:'error', summary:'Error', detail:'Login failed. Please check your credentials.'});
      }
    );
  }
}
