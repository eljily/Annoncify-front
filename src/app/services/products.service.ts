import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private api = "http://localhost:8081/api";

  constructor(private http: HttpClient) { }

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
}
