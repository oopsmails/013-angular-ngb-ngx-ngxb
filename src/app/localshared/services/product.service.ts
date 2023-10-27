import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/shared-model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl: string = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  getProductById(id: number): Observable<Product> {
    console.log('ProductService ::> getProductById: ');
    return this.http.get<Product>(`${this.apiUrl}/api/products/${id}`);
  }

  postProduct(data: Product): Observable<Product> {
    console.log('ProductService ::> postProduct: ');
    return this.http.post<Product>(`${this.apiUrl}/api/products`, data);
  }

  putProduct(data: Product): Observable<Product> {
    console.log('ProductService ::> putProduct: ', data);
    return this.http.put<Product>(`${this.apiUrl}/api/products/${data.id}`, data);
  }
}
