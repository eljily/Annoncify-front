import { Routes } from '@angular/router';
import { ProductsListComponent } from './components/products-list/products-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AdManagementComponent } from './components/ad-management/ad-management.component';

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
    { path: 'products/:categoryId', component: ProductsListComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component : SignupComponent},
    { path: 'about-us', component : AboutUsComponent},
    { path: 'contact-us', component : ContactUsComponent},
    { path: 'ad-management', component : AdManagementComponent}
];
