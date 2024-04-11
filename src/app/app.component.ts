import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { CategoryService } from './services/category.service';
import { Category } from './model/Category';
import { TabMenuModule } from 'primeng/tabmenu';
import { MenubarModule } from 'primeng/menubar';
import { SubCategory } from './model/SubCategory';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, TabMenuModule, MenubarModule, CommonModule]
})
export class AppComponent implements OnInit {

  isAuthenticated: boolean = false;
  title = 'annoncify_front';
  items: MenuItem[] = [];
  categories: Category[] = [];
  categoryIconMappings: { [key: string]: string } = {
    'Electronics': 'pi pi-mobile',
    'Telephones': 'pi pi-mobile',
    'Computers': 'pi pi-desktop',
    'Tablets': 'pi pi-tablet',
    'Accessories': 'pi pi-clock',
    'Home': 'pi pi-home',
    'Login': 'pi pi-sign-in', // Icon for Login
    'Signup': 'pi pi-user-plus' // Icon for Signup
  };

  constructor(private categoryService: CategoryService, private router: Router,private authService:AuthService) { }

  ngOnInit() {
    // Subscribe to authentication status changes
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isAuthenticated = isAuthenticated;
      // Load categories and update menu items based on authentication status
      this.loadCategories();
    });
  }
  
  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response;
  
        const homeCategoryIndex = this.categories.findIndex(category => category.name === 'Home');
        if (homeCategoryIndex === -1) {
          console.log("----------Home Category----------")
          const homeCategory: Category = { id: 0, name: 'Home', subCategories: [] };
          this.categories.unshift(homeCategory);
        }
  
        // Populate the items array with category menu items
        this.items = this.categories.map(category => {
          let routerLink: any[] = []; // Initialize routerLink variable
          if (category.id === 0) {
            routerLink = ['/products', 0]; // For "Home" category, set routerLink to navigate to ID 0
          }
          const subMenuItems: MenuItem[] = category.subCategories.map((subCategory: SubCategory) => ({
            label: subCategory.name,
            routerLink: ['/products', subCategory.id]
          }));
          return {
            label: category.name.trim() ? category.name : 'Unnamed Category',
            icon: this.categoryIconMappings[category.name],
            items: subMenuItems,
            routerLink: routerLink // Assign routerLink to the menu item
          };
        });
  
        // Add authentication-related menu items based on authentication status
        if (this.isAuthenticated) {
          this.items.push(
            { label: 'Profile', icon: 'pi pi-user', routerLink: ['/profile'] },
            { label: 'Logout', icon: 'pi pi-power-off', command: () => this.logout() }
          );
        } else {
          this.items.push(
            { label: 'Login', icon: 'pi pi-sign-in', routerLink: ['/login'] },
            { label: 'Signup', icon: 'pi pi-user-plus', routerLink: ['/signup'] }
          );
        }
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  
  
  

  logout() {
    this.authService.logout().subscribe(() => {
      // Redirect to the products page after logout
      this.router.navigate(['/products']);
    });
  }

  navigateToCategory(categoryId: number) {
    console.log(categoryId)
    if (categoryId === 0) {

      // If "Home" category is clicked and it has no subcategories, navigate to /products/0
      const homeCategory = this.categories.find(category => category.id === 0);
      if (homeCategory && homeCategory.subCategories.length === 0) {
        this.router.navigate(['/products', 0]);
      } else {
        // Otherwise, just navigate to /products/0 (default behavior for other categories)
        this.router.navigate(['/products', categoryId]);
      }
    } else {
      // For other categories, navigate to the respective category
      this.router.navigate(['/products', categoryId]);
    }
  }
}
