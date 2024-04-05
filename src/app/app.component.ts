import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api/menuitem';
import { CategoryService } from './services/category.service';
import { Category } from './model/Category';
import { TabMenuModule } from 'primeng/tabmenu';

import { MenubarModule } from 'primeng/menubar';
import { SubCategory } from './model/SubCategory';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule,TabMenuModule,MenubarModule]
})
export class AppComponent implements OnInit {
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
    'Others': 'pi pi-user'
  };

  constructor(private categoryService: CategoryService, private router: Router) { }

  ngOnInit() {
    this.categoryService.getAllCategories().subscribe(
      (response: any) => {
        this.categories = response;

        const homeCategoryIndex = this.categories.findIndex(category => category.name === 'Home');
        if (homeCategoryIndex === -1) {
          const homeCategory: Category = { id: 0, name: 'Home', subCategories: [] };
          this.categories.unshift(homeCategory);
        }

        const othersCategoryIndex = this.categories.findIndex(category => category.name === 'Others');
        if (othersCategoryIndex !== -1) {
          const othersCategory = this.categories.splice(othersCategoryIndex, 1)[0];
          this.categories.push(othersCategory);
        }

        this.items = this.categories.map(category => {
          const subMenuItems: MenuItem[] = category.subCategories.map((subCategory: SubCategory) => ({
            label: subCategory.name,
            routerLink: ['/products', subCategory.id]
          }));
          return {
            label: category.name.trim() ? category.name : 'Unnamed Category',
            icon: this.categoryIconMappings[category.name],
            items: subMenuItems
          };
        });
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