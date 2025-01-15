import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Import Observable

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  
  private baseUrl = 'http://localhost:5000/categories'; // Store base URL

  constructor(private _http: HttpClient) {}

  getAllCategories(): Observable<any> { // Return an Observable
    return this._http.get<any>(this.baseUrl); 
  }
}