import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { Product } from '../../shared/model/Product';
import { Image } from '../../shared/model/Image';
import { NgFor } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ButtonModule,DataViewModule,NgFor,NgxPaginationModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss'
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

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
      description: 'This Iphone is one ofthe best iphone in the world it used to be and it will always be the best',
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

    this.products = Array(70).fill(sampleProduct);
    console.log(this.products);
  }
}