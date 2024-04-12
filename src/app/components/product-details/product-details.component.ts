import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../model/Product';
import { CarouselModule } from 'primeng/carousel';
import { TranslationService } from '../../services/translation.service';
import { AppStateService } from '../../services/app-state.service';

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
  private language = "";

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    public translateService:TranslationService,
    private appState : AppStateService
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
      return `${diffSeconds} ${this.translateService.translate('secondes')}`;
    }
  
    const diffMinutes = Math.floor(diffSeconds / 60);
    if (diffMinutes < 60) {
      const minuteKey = this.translateService.translate('minute');
      const pluralSuffix = this.shouldAddPlural(diffMinutes);
      return `${diffMinutes} ${minuteKey}${pluralSuffix}`;
    }
  
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) {
      const heureKey = this.translateService.translate('heure');
      const pluralSuffix = this.shouldAddPlural(diffHours);
      return `${diffHours} ${heureKey}${pluralSuffix}`;
    }
  
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 30) {
      const jourKey = this.translateService.translate('jour');
      const pluralSuffix = this.shouldAddPlural(diffDays);
      if (this.language === 'ar'){
        return `${diffDays} ${pluralSuffix}`;
      }
      return `${diffDays} ${jourKey}${pluralSuffix}`;
    }
  
    const diffMonths = Math.floor(diffDays / 30);
    const moisKey = this.translateService.translate('mois');
    const pluralSuffix = this.shouldAddPlural(diffMonths);
    return `${diffMonths} ${moisKey} ${pluralSuffix}`;
}

shouldAddPlural(value: number): string {
    this.language = this.appState.userCurrentLanguage;
    if (this.language === 'ar') {
        return value > 1 ? 'أيام' : 'يوم';
    } else {
        return value > 1 ? 's' : '';
    }
}



  
}
