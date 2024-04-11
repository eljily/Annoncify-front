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

  getRelativeTime(dateString: Date): string {
    const currentDate = new Date();
    const date = new Date(dateString);
    const diffMilliseconds = currentDate.getTime() - date.getTime();
    const diffSeconds = Math.floor(diffMilliseconds / 1000);
  
    if (diffSeconds < 60) {
      return `${diffSeconds} secondes`;
    }
  
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`;
    }
  
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      return `${diffHours} heure${diffHours > 1 ? 's' : ''}`;
    }
  
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) {
      return `${diffDays} jour${diffDays > 1 ? 's' : ''}`;
    }
  
    const diffMonths = Math.floor(diffDays / 30);
    return `${diffMonths} mois${diffMonths > 1 ? 's' : ''}`;
  }
  
}
