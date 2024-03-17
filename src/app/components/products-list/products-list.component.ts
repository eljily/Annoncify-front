import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { PaginatorModule } from 'primeng/paginator';
import { Product } from '../../model/Product';
import { Image } from '../../model/Image';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ButtonModule, DataViewModule, PaginatorModule,RouterModule,NgFor],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  constructor(
    private productService: ProductsService,
     private router: Router,
     private route : ActivatedRoute
     ) {}

  products: Product[] = [];
  pagedProducts: Product[] = [];
  currentPage = 1; // Use a separate property for the current page
  rows = 14;
  totalProducts = 0;
  categoryId!: number ;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // Extract categoryId from route parameters
      this.categoryId = Number(params.get('categoryId'));
      // Call fetchProducts with the extracted categoryId
      this.fetchProducts(this.categoryId);
      console.log("ngOnInit executed!");
    });
  }

  navigateToProductDetails(productId: number) {
    this.router.navigate(['/product-details', productId]);
  }

  fetchProducts(categoryId: number) {
    if (categoryId === 0) {
      this.productService.getAllProducts().subscribe(
        (response: any) => {
          this.products = response.data;
          this.totalProducts = response.meta.total;
          this.updatePagedProducts();
        },
        error => {
          console.error('Error fetching products:', error);
        }
      );
    } else {
      this.productService.getProductsByCategoryId(categoryId).subscribe(
        (response: any) => {
          this.products = response.data;
          this.totalProducts = response.meta.total;
          this.updatePagedProducts();
        },
        error => {
          console.error('Error fetching products by category:', error);
        }
      );
    }
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
