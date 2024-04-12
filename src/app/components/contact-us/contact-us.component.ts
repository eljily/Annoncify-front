import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  formData = {
    name: '',
    contact: '',
    subject: '',
    message: ''
  };

  submitForm() {
    // Here you can implement the logic to handle form submission
    console.log('Form data:', this.formData);
    // You can also send the form data to your backend for processing
    // For example, using HTTP service
  }
}
