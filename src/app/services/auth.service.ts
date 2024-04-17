// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../model/User';
import { environment } from '../../environement/environement';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = ''; // Your API URL goes here

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http:HttpClient) {
    // Check if token is present in localStorage
  const tokenPresent = localStorage.getItem('token') !== null;
  this.apiUrl = environment.apiUrl;
  // Set the isAuthenticatedSubject based on the presence of the token
  this.isAuthenticatedSubject.next(tokenPresent);
  }

  // Method to set authentication status
  setAuthenticated(isAuthenticated: boolean) {
  
    this.isAuthenticatedSubject.next(isAuthenticated);
    console.log("user authenticated!!",isAuthenticated);
  }

  // Method to get authentication status
  isAuthenticated(): Observable<boolean> {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Method to register a new user
  registerUser(user: User): Observable<any> {
    // Make a POST request to the signup endpoint with user data
    return this.http.post<any>(`${this.apiUrl}/auth/signup`, user); // Use backticks for string interpolation
  }

  login(phoneNumber: string, password: string): Observable<any> {  
    // Create the request body with phoneNumber and password
    const body = { phoneNumber, password };
    // Make a POST request to the login endpoint with the request body
    return this.http.post<any>(`${this.apiUrl}/auth/login`, body);
    ;
  }
  logout(): Observable<any> {
    // Clear token and userId from local storage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.setAuthenticated(false);
    // Return a resolved observable
    return of(null);
  }
}
