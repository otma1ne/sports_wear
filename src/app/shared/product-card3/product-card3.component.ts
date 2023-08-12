import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductCart } from 'src/app/models/product_cart.model';
import { CartService } from 'src/app/services/cart.service';
import { handleCarteState } from 'src/app/store/actions/cart.action';
import { handleSearchState } from 'src/app/store/actions/header.action';

@Component({
  selector: 'app-product-card3',
  templateUrl: './product-card3.component.html',
  styleUrls: ['./product-card3.component.scss'],
})
export class ProductCard3Component {
  @Input() product?: Product;
  auth$: Observable<any>;
  isAuht: boolean = false;

  constructor(
    private router: Router,
    private headerStore: Store<{ header: any }>,
    private store: Store<{ auth: any }>,
    private cartStore: Store<{ cart: any }>,
    private cookieService: CookieService,
    private cartService: CartService
  ) {
    this.auth$ = this.store.select('auth');
    this.auth$.subscribe((authData) => {
      this.isAuht = authData.isAuth;
    });
  }

  handleCardClick(): void {
    this.router.navigate(['/product/' + this.product?.id]);
    const body = document.querySelector('body');
    this.headerStore.dispatch(handleSearchState({ state: false }));
    body!.style.overflow = 'auto';
  }

  async handleAddToCart(event: any) {
    event.stopPropagation();
    var products: ProductCart[] = [];
    if (this.isAuht) {
      this.addProductToBd();
    } else {
      this.addProductToCookie();
      products = this.getProductsFromCookie();
      this.cartStore.dispatch(handleCarteState({ state: products }));
    }
  }

  addProductToCookie() {
    const products = this.getProductsFromCookie();
    const existingProduct = products.find((p) => p.id === this.product?.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      products.push({ ...this.product!, quantity: 1 });
    }
    this.cookieService.set('cartProducts', JSON.stringify(products));
  }

  addProductToBd() {
    const userId = this.cookieService.get('userId');
    const productId = this.product?.id ?? '';
    this.cartService.addProductToCart(userId, productId).subscribe({
      next: (result) => {
        console.log(result.user.cart);
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

  getProductsFromCookie(): ProductCart[] {
    const productsString = this.cookieService.get('cartProducts');
    if (productsString) {
      return JSON.parse(productsString);
    }
    return [];
  }
}
