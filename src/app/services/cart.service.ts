import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BASE_URL } from './base-url';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  addProductsToCart(userId: string, cartItems: any) {
    const url = `${BASE_URL}/user/${userId}/cart/add-multiple`;
    return this.http.post<any>(url, cartItems);
  }

}
