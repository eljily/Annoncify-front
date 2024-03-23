import { Component } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { FormsModule, NgModel, NgModelGroup } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule,FieldsetModule,FileUploadModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {

constructor(private productService: ProductsService){}

product: any = {};
  images: any[] = [];

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price);
    for (let i = 0; i < this.images.length; i++) {
      formData.append('images', this.images[i]);
    }
    this.productService.addProduct(formData).subscribe(
      response => {
        console.log('Product added successfully', response);
        // Handle success
      },
      error => {
        console.error('Error adding product', error);
        // Handle error
      }
    );
  }

  onFileSelect(event: any) {
    const files: File[] = event.files;
    for (let i = 0; i < files.length; i++) {
      this.images.push(files[i]);
    }
  }
}
