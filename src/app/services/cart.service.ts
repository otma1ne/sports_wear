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

  addProductToCart(userId: string, productId: string, quantity?: number) {
    const url = `${BASE_URL}/user/${userId}/cart`;
    return this.http.post<any>(url, { productId, quantity });
  }

  deleteFromCart(userId: string, productId: string) {
    const url = `${BASE_URL}/user/${userId}/cart/${productId}`;
    return this.http.put<any>(url, { productId });
  }

  updateQuantity(userId: string, productId: string, quantity: number) {
    const url = `${BASE_URL}/user/${userId}/cart/${productId}/quantity`;
    return this.http.put<any>(url, { quantity });
  }

  checkoutCart(userId: string) {
    const url = `${BASE_URL}/user/${userId}/cart/checkout`;
    return this.http.post<any>(url, {});
  }
}
