import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { handleCarteState } from 'src/app/store/actions/cart.action';
import { ProductCart } from 'src/app/models/product_cart.model';
import { handleSearchState } from 'src/app/store/actions/header.action';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import {
  handleAddedInfoState,
  handleQuickProductState,
  handleQuickViewState,
} from 'src/app/store/actions/quickView.action';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product?: Product;
  currentImg: number = 0;
  auth$: Observable<any>;
  isAuth: boolean = false;

  constructor(
    private router: Router,
    private store: Store<{ auth: any }>,
    private cartStore: Store<{ cart: any }>,
    private headerStore: Store<{ header: any }>,
    private cookieService: CookieService,
    private cartService: CartService,
    private quickViewStore: Store<{ quickView: any }>
  ) {
    this.auth$ = this.store.select('auth');
    this.auth$.subscribe((authData) => {
      this.isAuth = authData.isAuth;
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
    if (this.isAuth) {
      this.addProductToBd();
    } else {
      this.addProductToCookie();
      products = this.getProductsFromCookie();
      this.cartStore.dispatch(handleCarteState({ state: products }));
      this.quickViewStore.dispatch(handleAddedInfoState({ state: true }));
    }
  }

  onHoverStart() {
    if (this.product?.images.length ?? 0 > 0) {
      this.currentImg = 1;
    }
  }

  onHoverEnd() {
    this.currentImg = 0;
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
        const productCart: ProductCart[] = [];
        result.user.cart.map((cart: any) => {
          const mapedProduct: ProductCart = {
            ...cart.product,
            quantity: cart.quantity,
          };
          productCart.push(mapedProduct);
        });
        this.cartStore.dispatch(handleCarteState({ state: productCart }));
        this.quickViewStore.dispatch(handleAddedInfoState({ state: true }));
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

  handleQuickView(event: any): void {
    event.stopPropagation();
    this.quickViewStore.dispatch(handleQuickViewState({ state: true }));
    this.quickViewStore.dispatch(
      handleQuickProductState({ state: this.product! })
    );
  }
}
