import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/Product';
import { environment } from '../../environement/environement';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private api = "";

  constructor(private http: HttpClient) { this.api = environment.apiUrl }

  public getAllProducts() :Observable<any> {
    return this.http.get(`${this.api}/products`);
  }
  getProductsByCategoryId(categoryId: number): Observable<any> {
    return this.http.get(`${this.api}/products/productsByCategoryId/${categoryId}`);
  }

  getAllProductsPaged(page: number = 0, size: number = 11): Observable<any> {
    return this.http.get(`${this.api}/products?page=${page}&size=${size}`);
  }

  getAllProductsByCategoryId(categoryId: number, page: number = 0, size: number = 10): Observable<any> {
    return this.http.get(`${this.api}/products/productsByCategoryId/${categoryId}?page=${page}&size=${size}`);
  }

  getProductDetails(productId: number): Observable<any> {
    return this.http.get(`${this.api}/products/${productId}`);
  }

  addProduct(product: FormData): Observable<any> {
    // Get the token from local storage
    const token = localStorage.getItem('token');

    // Set the authorization header with the bearer token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Make the HTTP POST request with the product data and authorization header
    return this.http.post<any>(`${this.api}/products/addProduct`, product, { headers });
  }
}
