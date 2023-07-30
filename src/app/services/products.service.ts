import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BASE_URL } from './base-url';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts() {
    const url = `${BASE_URL}/products`;
    return this.http.get<Product[]>(url);
  }

  getProduct(id: string) {
    const url = `${BASE_URL}/products/${id}`;
    return this.http.get<any>(url);
  }

  getTopRating() {
    const url = `${BASE_URL}/products/toprating`;
    return this.http.get<Product[]>(url);
  }

  getTrendingProduct() {
    const url = `${BASE_URL}/products/trending`;
    return this.http.get<Product[]>(url);
  }

  getBestSelling() {
    const url = `${BASE_URL}/products/bestselling`;
    return this.http.get<Product[]>(url);
  }
}
