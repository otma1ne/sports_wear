import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductCart } from 'src/app/models/product_cart.model';
import { CartService } from 'src/app/services/cart.service';
import { handleCarteState } from 'src/app/store/actions/cart.action';
import { handleAddedInfoState, handleQuickViewState } from 'src/app/store/actions/quickView.action';

@Component({
  selector: 'app-quick-view',
  templateUrl: './quick-view.component.html',
  styleUrls: ['./quick-view.component.scss'],
})
export class QuickViewComponent {
  quantity: number = 1;
  product?: Product;
  quickView$: Observable<any>;
  showQuickView: boolean = false;
  auth$: Observable<any>;
  isAuth: boolean = false;

  constructor(
    private quickViewStore: Store<{ quickView: any }>,
    private cookieService: CookieService,
    private cartService: CartService,
    private cartStore: Store<{ cart: any }>,
    private store: Store<{ auth: any }>
  ) {
    this.quickView$ = this.quickViewStore.select('quickView');
    this.quickView$.subscribe((data) => {
      this.showQuickView = data.showQuickView;
      this.product = data.product;
    });
    this.auth$ = this.store.select('auth');
    this.auth$.subscribe((authData) => {
      this.isAuth = authData.isAuth;
    });
  }

  incrementQuantity(): void {
    if (this.quantity < 10) this.quantity++;
  }

  decrementQuantity(): void {
    if (this.quantity > 1) this.quantity--;
  }

  closeModal(): void {
    this.quickViewStore.dispatch(handleQuickViewState({ state: false }));
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
    this.closeModal();
  }

  addProductToCookie() {
    const products = this.getProductsFromCookie();
    const existingProduct = products.find((p) => p.id === this.product?.id);
    if (existingProduct) {
      existingProduct.quantity += this.quantity;
    } else {
      products.push({ ...this.product!, quantity: this.quantity });
    }
    this.cookieService.set('cartProducts', JSON.stringify(products));
  }

  addProductToBd() {
    const userId = this.cookieService.get('userId');
    const productId = this.product?.id ?? '';
    this.cartService
      .addProductToCart(userId, productId, this.quantity)
      .subscribe({
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
}
