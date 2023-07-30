import { Component, Input } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { handleCarteState } from 'src/app/store/actions/cart.action';
import { ProductCart } from 'src/app/models/product_cart.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @Input() product?: Product;
  currentImg: number = 0;
  auth$: Observable<any>;
  isAuht: boolean = false;

  constructor(
    private router: Router,
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
  }

  handleAddToCart(event: any): void {
    event.stopPropagation();
    if (this.isAuht) {
    } else {
      this.addProductToCookie(this.product!);
    }
    const products = this.getProductsFromCookie();
    this.cartStore.dispatch(handleCarteState({ state: products }));
  }

  onHoverStart() {
    if (this.product?.images.length ?? 0 > 0) {
      this.currentImg = 1;
    }
  }

  onHoverEnd() {
    this.currentImg = 0;
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
