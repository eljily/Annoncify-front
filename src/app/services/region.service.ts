import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environement/environement';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private api = "";
  constructor(private http:HttpClient) { this.api = environment.apiUrl}

  public getAllRegions():Observable<any>{
    return this.http.get(`${this.api}/regions`);
  }
}
