import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ProductCart } from 'src/app/models/product_cart.model';
import { CartService } from 'src/app/services/cart.service';
import { handleCarteState } from 'src/app/store/actions/cart.action';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.scss'],
})
export class ProductCartComponent {
  @Input() product?: ProductCart;
  auth$: Observable<any>;
  isAuth: boolean = false;

  constructor(
    private authStore: Store<{ auth: any }>,
    private cartStore: Store<{ cart: any }>,
    private cookieService: CookieService,
    private cartService: CartService
  ) {
    this.auth$ = this.authStore.select('auth');
    this.auth$.subscribe((data) => {
      this.isAuth = data.isAuth;
    });
  }

  handleDeleteProduct(): void {
    if (this.isAuth) {
      this.removeFromBd();
    } else {
      this.removeProductFromCookie();
    }
  }

  removeFromBd() {
    const userId = this.cookieService.get('userId');
    const productId = this.product!.id;
    this.cartService.deleteFromCart(userId, productId).subscribe({
      next: (result) => {
        console.log(result);
        const productCart: ProductCart[] = [];
        result.user.cart.map((cart: any) => {
          const mapedProduct: ProductCart = {
            ...cart.product,
            quantity: cart.quantity,
          };
          productCart.push(mapedProduct);
        });
        this.cartStore.dispatch(handleCarteState({ state: productCart }));
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeProductFromCookie() {
    const products = this.getProductsFromCookie();
    const existingProductIndex = products.findIndex(
      (p) => p.id === this.product!.id
    );
    if (existingProductIndex !== -1) {
      products.splice(existingProductIndex, 1);
      this.cookieService.set('cartProducts', JSON.stringify(products));
      this.cartStore.dispatch(handleCarteState({ state: products }));
    }
  }

  getProductsFromCookie(): ProductCart[] {
    const productsString = this.cookieService.get('cartProducts');
    if (productsString) {
      return JSON.parse(productsString);
    }
    return [];
  }

  optimiseImageUrl(url: string, width: number): string {
    if (url.includes('upload')) {
      const optimizedUrl = url.replace(
        'upload',
        `upload/w_${width}/q_auto/f_auto/`
      );
      return optimizedUrl;
    } else {
      return url;
    }
  }
}
