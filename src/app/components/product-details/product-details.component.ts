import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
  productId!: number;
  productDetails: any; // Adjust this type based on your actual product details structure

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService
  ) { }

  ngOnInit() {
    // Get the productId from the route parameters
    this.route.params.subscribe(params => {
      this.productId = +params['productId']; // The '+' is used to convert the string to a number
      // Fetch product details using the productService
      this.fetchProductDetails();
    });
  }

  fetchProductDetails() {
    this.productService.getProductDetails(this.productId).subscribe(
      (response: any) => {
        this.productDetails = response;
        // Handle additional logic or UI updates as needed
      },
      error => {
        console.error('Error fetching product details:', error);
      }
    );
  }
}
