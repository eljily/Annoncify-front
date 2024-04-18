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
import { AppStateService } from '../../services/app-state.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, FieldsetModule, FileUploadModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  providers: [MessageService]
})
export class AddProductComponent implements OnInit {

  constructor(private productService: ProductsService,
    private categoryService: CategoryService,
    private router: Router,
    private messageService: MessageService,
    public translationService: TranslationService,
    public appStateService: AppStateService) { }

  product: any = {};
  images: any[] = [];
  msgs: any[] = [];
  categories: Category[] = [];
  subcategories: SubCategory[] = [];

  ngOnInit() {
    console.warn(this.product)
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
    console.warn("submitting .....")
    if (!this.product.name || !this.product.description || !this.product.price || !this.product.category || !this.product.subcategory) {
      const errMssg = this.translationService.translate("All fields are required")
      this.messageService.add({ severity: 'error', summary: '', detail: errMssg, life: 2500 });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.appStateService.setLoading(true); // Show loader
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
          this.clearForm();
          const addedMessage = this.translationService.translate("Annonce published successfully");
          this.messageService.add({ severity: 'success', summary: '', detail: addedMessage, life: 9000 });
        },
        error => {
          console.error('Error adding product', error);
          // Handle error
        }
      ).add(() => {
        this.appStateService.setLoading(false); // Hide loader after request completes
      });
    }
  }
  
  clearForm() {
    console.log(this.product)
    this.product = {};
    this.images = [];
    this.router.navigateByUrl("/products/0")
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const addedMessage = this.translationService.translate("Annonce published successfully");
          this.messageService.add({ severity: 'success', summary: '', detail: addedMessage, life: 7000 });
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
