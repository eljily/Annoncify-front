import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';

export const routes: Routes = [
    {
        path:"products",component:ProductsListComponent
    },
    {
        path:"",component:ProductsListComponent
    },
    {
        path:'products-details/:productId',component:ProductDetailsComponent
    },
    { path: 'products/:categoryId', component: ProductsListComponent }
];
