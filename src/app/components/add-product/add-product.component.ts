import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { MessageService } from 'primeng/api'; // Import MessageService
import { FormsModule, NgModel, NgModelGroup } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, FieldsetModule, FileUploadModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
  providers: [MessageService] // Provide MessageService
})
export class AddProductComponent {

  constructor(private productService: ProductsService, private messageService: MessageService) { } // Inject MessageService

  product: any = {};
  images: any[] = [];
  msgs: any[] = []; // Define msgs array to hold messages

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price);
    formData.append('category', this.product.category);
    for (let i = 0; i < this.images.length; i++) {
      formData.append('images', this.images[i]);
    }
    console.log(this.product)
    this.productService.addProduct(formData).subscribe(
      response => {
        console.log('Product added successfully', response);
        this.messageService.add({severity:'success', summary:'Success', detail:'Product added successfully'}); // Display success message
        this.clearForm(); // Clear form fields
      },
      error => {
        console.error('Error adding product', error);
        // Handle error
      }
    );
  }
  
  clearForm() {
    this.product = {}; // Reset product object
    this.images = []; // Clear images array
  }
  

  onFileSelect(event: any) {
    const files: File[] = event.files;
    for (let i = 0; i < files.length; i++) {
      this.images.push(files[i]);
    }
  }
}
