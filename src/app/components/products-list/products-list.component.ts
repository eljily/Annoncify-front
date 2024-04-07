import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { PaginatorModule } from 'primeng/paginator';
import { Product } from '../../model/Product';
import { Image } from '../../model/Image';
import { ProductsService } from '../../services/products.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgFor } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ButtonModule, DataViewModule, PaginatorModule, RouterModule, NgFor],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent implements OnInit {
  constructor(
    private productService: ProductsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  pagedProducts: Product[] = [];
  currentPage = 1; // Use a separate property for the current page
  rows = 30;
  totalProducts = 0;
  categoryId!: number;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // Extract categoryId from route parameters
      this.categoryId = Number(params.get('categoryId'));
      // Call fetchProducts with the extracted categoryId
      this.fetchProducts(this.categoryId);
      console.log("ngOnInit executed!")
    });
  }

  navigateToProductDetails(productId: number) {
    this.router.navigate(['/products-details', productId]); // Note the corrected path
  }

  fetchProducts(categoryId: number) {
    let productsObservable: Observable<any>;

    if (categoryId === 0) {
      this.rows = 32;
      productsObservable = this.productService.getAllProductsPaged(this.currentPage - 1, this.rows);
    } else {
      productsObservable = this.productService.getAllProductsByCategoryId(categoryId, this.currentPage - 1, this.rows);
    }

    productsObservable.subscribe(
      (response: any) => {
        this.pagedProducts = response.data;
        this.totalProducts = response.meta.total;
        console.log("paged products:", this.pagedProducts);
      },
      error => {
        console.error('Error fetching products:', error);
      }
    );
  }

  onPageChange(event: any) {
    this.currentPage = event.page + 1; // Paginator starts from 0, adjust to 1-based index
    this.fetchProducts(this.categoryId);
  }
  
  redirectToAddProduct() {
    this.router.navigateByUrl('/add');
    }
}
