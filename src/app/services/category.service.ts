import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private api = "http://localhost:8081/api";

  constructor(private http:HttpClient) { }

  public getAllCategories():Observable<any>{
    return this.http.get(`${this.api}/categories`);
  }
}
