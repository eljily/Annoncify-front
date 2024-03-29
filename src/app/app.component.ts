import { Component } from '@angular/core';
import { Route, Router, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { TabMenuModule } from 'primeng/tabmenu';
import { CategoryService } from './services/category.service';
import { MenubarModule } from 'primeng/menubar';
import { Category } from './model/Category';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,TabMenuModule,MenubarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public constructor(private categoryService:CategoryService,private router:Router){}
  title = 'annoncify_front';
  items: MenuItem[] = [];
   categories: Category[] = []; // Assuming Category is your model with categoryId and name properties
  categoryIconMappings: { [key: string]: string } = { // Mapping between category names and icons
    'Electronics':'pi pi-mobile',
    'Telephones': 'pi pi-mobile',
    'Computers': 'pi pi-desktop',
    'Tablets': 'pi pi-tablet',
    'Accessories': 'pi pi-clock',
    'Home':'pi pi-home',
    'Others' : 'pi pi-user'
  };

  ngOnInit() {
    // Fetch categories from backend
    // Example:
    this.categoryService.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response;
  
        // Check if a category with the name "Home" already exists
        const homeCategoryIndex = this.categories.findIndex(category => category.name === 'Home');
        if (homeCategoryIndex === -1) {
          // Add the Home category manually only if it doesn't already exist
          const homeCategory: Category = { id: 0, name: 'Home' };
          this.categories.unshift(homeCategory);
        }
  
        // Ensure "Others" category appears last
        const othersCategoryIndex = this.categories.findIndex(category => category.name === 'Others');
        if (othersCategoryIndex !== -1) {
          const othersCategory = this.categories.splice(othersCategoryIndex, 1)[0]; // Remove "Others" category
          this.categories.push(othersCategory); // Push it to the end
        }
  
        // Populate menu items dynamically based on categories and icon mappings
        this.items = this.categories.map(category => ({
          label: category.name.trim() ? category.name : 'Unnamed Category', // Check for empty label
          icon: this.categoryIconMappings[category.name],
          routerLink: ['/products', category.id]
        })).filter(item => item.label && item.routerLink); // Filter out items with empty labels or routerLinks
      },
      error => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  

  navigateToCategory(categoryId: number) {
    this.router.navigate(['/products', categoryId]);
  }

}
