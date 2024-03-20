import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../model/Product';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productId!: number;
  productDetails!: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) { }

  ngOnInit() {
    // Get the productId from the route parameters
    this.route.params.subscribe(params => {
      this.productId = +params['productId']; // The '+' is used to convert the string to a number
      this.fetchProductDetails();
    });
  }

  fetchProductDetails() {
    this.productService.getProductDetails(this.productId).subscribe(
      (response: any) => {
        if (!this.productDetails) {
          this.productDetails = response;
        }
        console.log(response)
      },
      error => {
        console.error('Error fetching product details:', error);
      }
    );
  }
}
