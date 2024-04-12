import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductsService } from '../../services/products.service';
import { CategoryService } from '../../services/category.service';
import { FormsModule } from '@angular/forms';
import { FieldsetModule } from 'primeng/fieldset';
import { FileUploadModule } from 'primeng/fileupload';
import { Category } from '../../model/Category';
import { SubCategory } from '../../model/SubCategory';
import { CommonModule } from '@angular/common';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, FieldsetModule, FileUploadModule,CommonModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [MessageService]
})
export class AddProductComponent implements OnInit {

  constructor(private productService: ProductsService, 
    private categoryService: CategoryService, 
    private router: Router,
     private messageService: MessageService,
     public translationService:TranslationService) { }

  product: any = {};
  images: any[] = [];
  msgs: any[] = [];
  categories: Category[] = [];
  subcategories: SubCategory[] = [];

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(
      (response: any) => {
        console.log(response)
        this.categories = response;
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name', this.product.name);
    formData.append('description', this.product.description);
    formData.append('price', this.product.price);
    formData.append('category', this.product.category);
    formData.append('subCategoryId', this.product.subcategory); // Append selected subcategory
    for (let i = 0; i < this.images.length; i++) {
      formData.append('images', this.images[i]);
    }
    console.log(this.product)
    this.productService.addProduct(formData).subscribe(
      response => {
        console.log('Product added successfully', response);
        this.messageService.add({severity:'success', summary:'Success', detail:'Product added successfully'});
        this.clearForm();
      },
      error => {
        console.error('Error adding product', error);
        // Handle error
      }
    );
  }
  
  clearForm() {
    this.product = {};
    this.images = [];
  }
  
  onFileSelect(event: any) {
    const files: File[] = event.files;
    for (let i = 0; i < files.length; i++) {
      this.images.push(files[i]);
    }
  }

  onCategoryChange(categoryName: string) {
    console.log('Selected category:', categoryName);
    const selectedCategory = this.categories.find(category => category.name === categoryName);
    console.log('Selected category object:', selectedCategory);
    if (selectedCategory && selectedCategory.subCategories) {
      this.subcategories = selectedCategory.subCategories;
      console.log('Subcategories:', this.subcategories);
    } else {
      this.subcategories = [];
      console.log('No subcategories found for the selected category.');
    }
  }
}
