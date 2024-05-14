import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Message, MessageService } from 'primeng/api'; // Import MessageService from primeng/api
import { TranslationService } from '../../services/translation.service';
import { MessagesModule } from 'primeng/messages';
import { CommonModule } from '@angular/common';
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FormsModule, MessagesModule,CommonModule],
  providers: [MessageService], // Add MessageService to providers array
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  phoneNumber!: string;
  password!: string;
  msgs: any[] = [];
  loginInProgress = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    public translationService: TranslationService,
    private messageService: MessageService, // Add MessageService to constructor,
    private appState : AppStateService
  ) {}

  login() {
    const allFieldsRequiredMsg = this.translationService.translate('All fields are required');
    const badCredentialsMsg = this.translationService.translate('Bad Credentials');
  
    if (this.loginInProgress) {
      // Prevent multiple login attempts
      return;
    }

    if (!this.phoneNumber || !this.password) {
      // Display message for all fields required
      this.messageService.add({severity:'error', summary:'', detail: allFieldsRequiredMsg || 'please no', life: 3000}); // Exit the method
      return;
    }

    // Set loginInProgress flag to true
    this.loginInProgress = true;

    // Call the login method from your authentication service
    this.authService.login(this.phoneNumber, this.password).subscribe(
      response => {
        // Handle successful login response
        console.warn('Login successful:', response);
        localStorage.setItem('token', response.jwt);
        localStorage.setItem('userId', response.userId);
        this.appState.userId = response.userId;
        this.appState.isAuthenticated = true;
        this.authService.setAuthenticated(true);
        // Optionally navigate to another page
        this.router.navigate(['/add']);
      },
      error => {
        // Handle login error
        console.warn('Login failed:', error);
        this.messageService.add({severity:'error', summary:'', detail: badCredentialsMsg, life: 3000});
        console.warn(this.msgs);
      }
    ).add(() => {
      // Set loginInProgress flag to false when login request completes
      this.loginInProgress = false;
    });
  }
}
