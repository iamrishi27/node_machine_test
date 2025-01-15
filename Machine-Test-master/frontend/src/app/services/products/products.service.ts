import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private baseUrl = 'http://localhost:5000/products'; // Store base URL

  constructor(private _http: HttpClient) {}

  // getAllProducts(): Observable<any> {
  //   return this._http.get<any>(this.baseUrl);
  // }

  getAllProducts(page: number, pageSize: number): Observable<any> {
    return this._http.get(`${this.baseUrl}?page=${page}&pageSize=${pageSize}`);
  }
  addProduct(payload: any): Observable<any> {
    return this._http.post<any>(this.baseUrl, payload);
  }

  updateProduct(productId: number, payload: any): Observable<any> {
    console.log('**************new payload***********',payload);
    return this._http.put<any>(this.baseUrl+ '/' +productId, payload);
  }
  deleteProduct(productId: number) : Observable<any> {
    return this._http.delete<any>(this.baseUrl + '/' + productId);
  }
}
