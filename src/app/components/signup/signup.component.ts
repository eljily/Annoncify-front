import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/User';
import { TranslationService } from '../../services/translation.service';
import { MessageService } from 'primeng/api'; // Import MessageService from primeng/api
import { MessagesModule } from 'primeng/messages';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, InputTextModule, ButtonModule,MessagesModule],
  providers: [MessageService], // Add MessageService to providers array
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  user: User = { name: '', phoneNumber: '', email: '', password: '' }; // Initialize user object with empty values
  retypePassword: string = '';
  msgs: any[] = [];

  constructor(private authService: AuthService, private router: Router, public translationService: TranslationService, private messageService: MessageService) { }

  register() {
    const allFieldsRequiredMsg = this.translationService.translate('All fields are required');
    const passwordsNotMatchMsg = this.translationService.translate('Passwords do not match');

    // Check if any field is empty
    if (!this.user.name || !this.user.phoneNumber  || !this.user.password || !this.retypePassword) {
      this.messageService.add({severity:'error', summary:'', detail: allFieldsRequiredMsg, life: 3000});
      return;
    }

    // Check if passwords match
    if (this.user.password !== this.retypePassword) {
      this.messageService.add({severity:'error', summary:'', detail: passwordsNotMatchMsg, life: 3000});
    }
    else{
      this.authService.registerUser(this.user)
      .subscribe(
        response => {
          console.log('User registered successfully:', response);
          if (response.message) {
            // Display the response message to the user
            console.log(response.message);
            // Optionally navigate to another page
            this.router.navigate(['/login']);
          } else {
            console.error('Response does not contain a message:', response);
          }
        },
        error => {
          console.error('Error registering user:', error.error.message);
          this.messageService.add({severity:'error', summary:'', detail: error.error.message, life: 3000});
          // Optionally, you can show an error message to the user
        }
      );

    }
  }
}
