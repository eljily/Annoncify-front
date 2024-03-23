import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddProductComponent } from './components/add-product/add-product.component';

export const routes: Routes = [
    {
        path:"products",component:ProductsListComponent
    },
    {
        path:"",component:ProductsListComponent
    },
    {
        path:"add",component:AddProductComponent
    },
    {
        path:"profile",component:ProfileComponent
    },
    {
        path:'products-details/:productId',component:ProductDetailsComponent
    },
    { path: 'products/:categoryId', component: ProductsListComponent }
];
