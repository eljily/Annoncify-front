import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { UserService } from '../../services/user.service';
import { AppStateService } from '../../services/app-state.service';
import { CommonModule } from '@angular/common';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { Router } from '@angular/router';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-ad-management',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, PaginatorModule],
  templateUrl: './ad-management.component.html',
  styleUrls: ['./ad-management.component.scss']
})
export class AdManagementComponent implements OnInit {

   @ViewChild('dt') dt!: Table;

  userProfile: any = {}; // Placeholder for user profile data
  ads: any[] = []; // Placeholder for ad data
  sortedColumns: string[] = []; // Array to track sorted columns
  totalRecords: number = 0;

  constructor(private productService: ProductsService,
     private userService: UserService,
      private appState: AppStateService,
    private router : Router,
  public translationService:TranslationService) { }

  ngOnInit(): void {
    this.loadUserProfile(); // Load user profile data
    this.loadAds(); // Load ads for the user
  }

  loadUserProfile(): void {
    // Assuming there's a method in your UserService to get user profile
    this.userService.getUserProfile(this.appState.userId).subscribe(
      (data) => {
        this.userProfile = data;
      },
      (error) => {
        console.error('Error loading user profile:', error);
      }
    );
  }

  loadAds(): void {
    // Assuming getProductsByUserId returns an observable
    this.userService.getUserProducts().subscribe(
      (data) => {
        this.ads = data;
        this.totalRecords = this.ads.length; 
      },
      (error) => {
        console.error('Error loading ads:', error);
      }
    );
  }

  editAd(ad: any): void {
    // Implement edit functionality
  }
  addNew() {
    this.router.navigateByUrl('/add')
  } 

  deleteAd(ad: any): void {
    if (confirm('Are you sure you want to delete this ad?')) {
      this.productService.deleteProductById(ad.id).subscribe(
        () => {
          // Remove the deleted ad from the ads array
          this.ads = this.ads.filter((item) => item.id !== ad.id);
        },
        (error) => {
          console.error('Error deleting ad:', error);
        }
      );
    }
  }
  
  isColumnSorted(column: string): boolean {
    return this.sortedColumns.includes(column);
  }

  onSort(event: any): void {
    this.sortedColumns = event.multiSortMeta.map((sortMeta: any) => sortMeta.field);
  }
}
