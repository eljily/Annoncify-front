import { Component, OnInit, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { PaginatorModule } from 'primeng/paginator';
import { Product } from '../../model/Product';
import { Image } from '../../model/Image';
import { NgFor } from '@angular/common';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ButtonModule, DataViewModule, PaginatorModule,NgFor],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {

  constructor(private productService: ProductsService) {}
  
  products: Product[] = [];
  pagedProducts: Product[] = [];
  currentPage = 1; // Use a separate property for the current page
  rows = 14;
  totalProducts = 0; 

  ngOnInit() {
    // Assuming you have a method to fetch products from a service or API
    this.fetchProducts();
  }

  fetchProducts() {
    // Replace this with your actual data fetching logic
    // For demonstration purposes, we'll create a sample product
    const sampleProduct: Product = {
      id: 1,
      name: 'Iphone 15 Pro Max',
      price: 100,
      description: 'This Iphone is one of the best iPhones in the world. It used to be and it will always be the best.',
      createDate: new Date(),
      updateDate: new Date(),
      images: [
        { imageUrl: 'https://firebasestorage.googleapis.com/v0/b/itkann-app.appspot.com/o/b634cce9-5c07-4926-825d-e73c74e19329.jpg?alt=media' } as Image
      ],
      category: {
        name: 'Sample Category',
        id: 1
      }
    };

    // this.products = Array(70).fill(sampleProduct);
    this.productService.getProducts().subscribe(
      (response: any) => {
        // Assuming your API response structure
        this.products = response.data;
        this.totalProducts = response.meta.total;
        this.updatePagedProducts();
        console.log(this.products);
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
    this.updatePagedProducts();
    console.log(this.products);
  }

  updatePagedProducts() {
    const startIndex = (this.currentPage - 1) * this.rows;
    const endIndex = startIndex + this.rows;
    this.pagedProducts = this.products.slice(startIndex, endIndex);
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1; // Paginator starts from 0, adjust to 1-based index
    this.updatePagedProducts();
  }
}