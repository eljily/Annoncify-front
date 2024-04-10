// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api/auth'; // Your API URL goes here

  constructor(private http: HttpClient) { }

  // Method to register a new user
  registerUser(user: User): Observable<any> {
    // Make a POST request to the signup endpoint with user data
    return this.http.post<any>(`${this.apiUrl}/signup`, user); // Use backticks for string interpolation
  }
}
