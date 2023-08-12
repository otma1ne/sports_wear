import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductCart } from 'src/app/models/product_cart.model';
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
    private cookieService: CookieService
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

  handleAddToCart(event: any): void {
    if (this.isAuht) {
    } else {
      this.addProductToCookie(this.product!);
    }
    const products = this.getProductsFromCookie();
    this.cartStore.dispatch(handleCarteState({ state: products }));
    event.stopPropagation();
  }

  addProductToCookie(product: Product) {
    let products: ProductCart[] = this.getProductsFromCookie();
    if (products === null) {
      products = [{ ...product, quantity: 1 }];
    } else {
      products.push({ ...product, quantity: 1 });
    }
    this.cookieService.set('cartProducts', JSON.stringify(products));
  }

  getProductsFromCookie(): ProductCart[] {
    const productsString = this.cookieService.get('cartProducts');
    if (productsString) {
      return JSON.parse(productsString);
    }
    return [];
  }
}
