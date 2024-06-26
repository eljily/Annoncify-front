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
import { TranslationService } from './services/translation.service';
import { AppStateService } from './services/app-state.service';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, TabMenuModule, MenubarModule, CommonModule],
})
export class AppComponent implements OnInit {
  isAuthenticated: boolean = false;
  title = 'annoncify_front';
  items: MenuItem[] = [];
  categories: Category[] = [];
  categoryIconMappings: { [key: string]: string } = {
    Electronics: 'fas fa-laptop',
    Telephones: 'pi pi-mobile',
    Computers: 'pi pi-desktop',
    Tablets: 'pi pi-tablet',
    Accessories: 'pi pi-clock',
    Accueil: 'pi pi-home',
    '': 'fa fa-home',
    الرئيسية: 'pi pi-home',
    Login: 'pi pi-sign-in',
    Signup: 'pi pi-user-plus',

    Vehicles: 'fa fa-car',
    'Real Estate': 'fa fa-building',
    Phones: 'pi pi-mobile',
    'Home Appliances': 'fa fa-blender',
    'Jobs & Services': 'fa fa-briefcase',
    'Materials & Equipment': 'fa fa-tools',
    'Fashion & Beauty': 'fa fa-tshirt',
    'Leisure & Games': 'fa fa-gamepad',
    Other: 'fa fa-cube',
  };

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private authService: AuthService,
    public translationService: TranslationService,
    private appState: AppStateService
  ) {}

  ngOnInit() {
    this.translationService.loadTranslations();
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage) {
      this.translationService.setLanguage(storedLanguage);
    }
    this.translationService.currentLanguage.subscribe(() => {
      // Update translated strings whenever the language changes
      this.loadCategories();
    });

    // Subscribe to authentication status changes
    this.authService.isAuthenticated().subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;
      // Load categories and update menu items based on authentication status
      this.loadCategories();
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response;

        const homeCategoryIndex = this.categories.findIndex(
          (category) => category.name === 'Home'
        );
        if (homeCategoryIndex === -1) {
          console.log('----------Home Category----------');
          const homeCategory: Category = {
            id: 0,
            name: this.translationService.translate('') || '',
            subCategories: [],
          };
          this.categories.unshift(homeCategory);
        }

        // Populate the items array with category menu items
        this.items = this.categories.map((category) => {
          let routerLink: any[] = []; // Initialize routerLink variable
          if (category.id === 0) {
            routerLink = ['/products', 0]; // For "Home" category, set routerLink to navigate to ID 0
          }
          const subMenuItems: MenuItem[] = category.subCategories.map(
            (subCategory: SubCategory) => ({
              label:
                this.translationService.translate(subCategory.name) ||
                subCategory.name.trim(), // Translate subcategory name
              routerLink: ['/products', subCategory.id],
            })
          );
          return {
            label:
              this.translationService.translate(
                category.name && category.name.trim() ? category.name : ''
              ) || category.name.trim(), // Translate category name
            icon: this.categoryIconMappings[category.name],
            items: subMenuItems,
            routerLink: routerLink, // Assign routerLink to the menu item
          };
        });

        // Add language selection menu item
        this.items.push({
          label: this.translationService.translate('Lang'),
          icon: 'fa fa-globe',
          items: [
            {
              label: this.translationService.translate('Arabic'),
              icon: 'fa fa-flag',
              command: () => this.changeLanguage('ar'),
            },
            {
              label: this.translationService.translate('English'),
              icon: 'fa fa-flag',
              command: () => this.changeLanguage('en'),
            },
            {
              label: this.translationService.translate('French'),
              icon: 'fa fa-flag',
              command: () => this.changeLanguage('fr'),
            },
          ],
        });

        this.items.push({
          label: this.translationService.translate('Publier Votre Annonce'),
          icon: 'fa fa-plus',
          routerLink: this.appState.isAuthenticated ? ['/add'] : ['/login'],
        });

        // Add authentication-related menu items based on authentication status
        if (this.isAuthenticated) {
          this.items.push({
            label: this.translationService.translate('Profile'),
            icon: 'pi pi-user',
            items: [
              {
                label: this.translationService.translate('Gérer mes annonces'),
                icon: 'pi pi-list',
                routerLink: ['/ad-management'],
              },
              // { label: this.translationService.translate('Modifier les informations'), icon: 'pi pi-pencil', routerLink: ['/edit-profile']},
              {
                label: this.translationService.translate('Logout'),
                icon: 'fa fa-sign-out',
                command: () => this.logout(),
              },
            ],
          });
        } else {
          this.items.push(
            {
              label: this.translationService.translate('Login'),
              icon: 'pi pi-sign-in',
              routerLink: ['/login'],
            }
            // { label: this.translationService.translate('Signup'), icon: 'pi pi-user-plus', routerLink: ['/signup'] }
          );
        }
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }

  changeLanguage(event: any) {
    const selectedLanguage = event; // Safely access value property
    if (selectedLanguage) {
      // Set the language in the translation service
      this.translationService.setLanguage(selectedLanguage);
      // Store the language in local storage
      localStorage.setItem('language', selectedLanguage);
      this.loadCategories();
    }
  }

  logout() {
    this.authService.logout().subscribe(() => {
      // Redirect to the products page after logout
      this.router.navigate(['/products']);
    });
  }

  navigateToCategory(categoryId: number) {
    console.log(categoryId);
    if (categoryId === 0) {
      // If "Home" category is clicked and it has no subcategories, navigate to /products/0
      const homeCategory = this.categories.find(
        (category) => category.id === 0
      );
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

  navigateToAboutUs() {
    this.router.navigateByUrl('about-us');
  }
}
