import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environement/environement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api = "";

  constructor(private http: HttpClient) { this.api = environment.apiUrl }

  getUserProfile(userId: number): Observable<any> {
    return this.http.get(`${this.api}/users/${userId}`);
  }
  
  getUserProducts(): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any>(`${this.api}/users/myProducts`, { headers });
  }
}
