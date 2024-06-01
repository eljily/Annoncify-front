import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environement/environement';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private api = '';

  constructor(private http: HttpClient) {
    this.api = environment.apiUrl;
  }

  public getAllCategories(): Observable<any> {
    return this.http.get(`${this.api}/categories`);
  }
}
